import _ from 'lodash';
import React, { useState, useEffect, useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import TableProvider from './TableProvider';
import Renderer from './Renderer';
import Row from './components/Row';
import Table from './components/Table';
import Thead from './components/Thead';
import Tbody from './components/Tbody';
import Tr from './components/Tr';
import Th from './components/Th';
import Td from './components/Td';
import Toolbar from './components/Toolbar';
import Pagination from './components/Pagination';
import Container from './components/Container';
import ExtendedDiv from './components/ExtendedDiv';
import Print from './components/Print';
import { useTableWidth, useTableScroll } from './hooks';
import { setPage, setLimit, setSort, SET_SORT, SET_FILTER, MODIFY_DATA } from './actions';
import { ADD_COLUMN, REMOVE_COLUMN, SET_IS_PRINTING, TOGGLE_EDITABLE } from './constants';
import {
    createActionCreator,
    isArray,
    getStyles,
    getExtraBodyRowProps,
    calculateWidth,
    prepareData,
    getInitialVisibleColumns,
    changeSortOrder
} from './utils';

const tableReducer = ( state, { type, value }) => {
    const options = {
        [ADD_COLUMN]: () => {
            let visibleColumnIds = [ ...state.visibleColumnIds ];
            visibleColumnIds.push(value);
            visibleColumnIds.sort();
            return { ...state, visibleColumnIds }
        },
        [REMOVE_COLUMN]: () => {
            let visibleColumnIds = [ ...state.visibleColumnIds ];
            visibleColumnIds.splice(visibleColumnIds.indexOf(value), 1).sort();
            return { ...state, visibleColumnIds }
        },
        [SET_IS_PRINTING]: () => {
            return { ...state, isPrinting: value };
        },
        [TOGGLE_EDITABLE]: () => {
            return { ...state, isEditing: !state.isEditing }
        }
    }

    return options[type]();
}

const renderToolbar = (
    config = [],
    action,
    thunk,
    internalStateUpdater,
    columns,
    editable,
    isEditing,
    isModified,
    visibleColumns,
    styles = {}
) => (
    <Row className="rdt-toolbar-row">
        <Toolbar items={ config } styles={ styles }>
            {({ state, ...itemConfig }) => (
                <Renderer
                    ofType="toolbar"
                    forItem={ itemConfig.type }
                    itemConfig={ itemConfig }
                    action={ action }
                    thunk={ thunk }
                    internalStateUpdater={ internalStateUpdater }
                    columns={ columns }
                    visibleColumns={ visibleColumns }
                    isModified={ isModified }
                    isEditable={ editable }
                    isEditing={ isEditing }
                />
            )}
        </Toolbar>
    </Row>
);

const renderPagination = ( position, query, config = {}, action, thunk, styles = {} ) => (
    <Row className={ `rdt-pagination-row ${position}` }>
        <Pagination position={ position } config={ config } query={ query } styles={ styles }>
            {(item, paginationProps) => (
                <Renderer
                    ofType="pagination"
                    forItem={ item.type }
                    action={ action }
                    { ...item }
                    { ...paginationProps }
                />
            )}
        </Pagination>
    </Row>
);

const renderTable = ({
    action,
    bodyExtraData = {},
    columns = [],
    height,
    isFetching,
    isEditing,
    isPrinting,
    items,
    modified = {},
    query = {},
    pointerEvents,
    primaryKey,
    rowHeight,
    schema,
    state = {},
    styles = {},
    tableHeader,
    tableBody,
    thunk,
    top,
    visibleHeight,
    width,
    widthAdjustment = 1,
}) => (
    <Container className="rdt-inner-container" styles={ getStyles(styles, 'tableContainer') }>
        <Table className="rdt-table" styles={ getStyles(styles, 'table') }>
            <Thead className="rdt-table-head" ref={ tableHeader } width={ `${width}px` } styles={ getStyles(styles, 'thead') }>
                <Tr className="rdt-table-row" columns={ columns } styles={ getStyles(styles.tr, 'header') }>
                    {({ sortable, width, textAlign, name, type, ...rest }, index) => {
                        const { sort, dir } = query;
                        return (
                            <Th
                                key={ index }
                                className={ `rdt-th ${name} ${type}` }
                                sortable={ sortable }
                                width={ width * widthAdjustment }
                                textAlign={ textAlign }
                                styles={ styles.th }
                                onClick={ sortable ? changeSortOrder.bind(this, query, name, action(SET_SORT)) : null }
                            >
                                <Renderer
                                    ofType="header"
                                    forItem={ type }
                                    name={ name }
                                    sortable={ sortable }
                                    sort={ sort }
                                    dir={ dir }
                                    action={ action }
                                    { ...rest }
                                />
                            </Th>
                        );
                    }}
                </Tr>
                <Tr className="rdt-table-row" columns={ columns } styles={ getStyles(styles.tr, 'filter') }>
                    {({ filterable, type, width, ...rest }, index) => {
                        const { name } = rest;
                        const value = _.get(query, ['search', name, 'value']);
                        return (
                            <Td
                                key={ index }
                                className={ `rdt-table-col filter ${name} ${type}` }
                                width={ `${width * widthAdjustment}px` }
                                styles={ getStyles(styles.td, 'filter') }
                            >
                                { filterable && <ExtendedDiv styles={ getStyles(styles.filter, name) }>
                                    <Renderer
                                        ofType="filter"
                                        forItem={ type }
                                        value={ value }
                                        filterer={(key, filter) => action(SET_FILTER)({ key, filter })}
                                        { ...rest }
                                    />
                                </ExtendedDiv> }
                            </Td>
                        );
                    }}
                </Tr>
            </Thead>
            <Tbody
                className="rdt-table-body"
                ref={ tableBody }
                width={ width }
                height={ height > visibleHeight ? visibleHeight : height }
                innerHeight={ height }
                data={ items }
                startTop={ top }
                isFetching={ isFetching }
                isPrinting={ isPrinting }
                visibleHeight={ visibleHeight }
                rowHeight={ rowHeight }
                loaderStyles={ getStyles(styles, 'loader') }
                styles={ getStyles(styles, 'tbody') }
                windowing={ true }
            >
                {({ item, top, index: rowIndex }) => {
                    const data = prepareData(item, schema, state);
                    const primarKeyValue = _.get(data, primaryKey);
                    const modifiedData = modified[primarKeyValue] || {};
                    return (
                        <Tr
                            key={ rowIndex }
                            className="rdt-table-row"
                            position="absolute"
                            top={ `${top}px` }
                            columns={ columns }
                            height={ `${rowHeight}px` }
                            even={ rowIndex % 2 === 0 }
                            styles={ getStyles(styles.tr, 'body') }
                        >
                            {(column, index) => {
                                const { width, textAlign, name, type } = column;
                                const ColRenderer = column.renderer || Renderer;
                                return (
                                    <Td
                                        key={ index }
                                        className={ `rdt-table-col ${name} ${type}` }
                                        width={ `${width * widthAdjustment}px` }
                                        styles={ getStyles(styles.td, 'body') }
                                    >
                                        <ExtendedDiv className="rdt-table-col-inner" styles={ getStyles(styles.body, name) }>
                                            <ColRenderer
                                                ofType="body"
                                                forItem={ type }
                                                data={ data }
                                                colConfig={ column }
                                                extraData={ bodyExtraData[name] }
                                                action={ action }
                                                thunk={ thunk }
                                                isEditing={ isEditing }
                                                modifiedData={ modifiedData }
                                                modifiedValue={ _.get(modifiedData, name) }
                                                handleChange={(event) => {
                                                    var newData = { ...modifiedData };
                                                    _.set(newData, primaryKey, primarKeyValue);
                                                    _.set(newData, event.target.name, event.target.value);
                                                    action(MODIFY_DATA)({ key: primarKeyValue, value: newData })
                                                }}
                                            />
                                        </ExtendedDiv>
                                    </Td>
                                );
                            }}
                        </Tr>
                    );
                }}
            </Tbody>
        </Table>
    </Container>
);

const ReduxDatatable = ( props ) => {
    const { config = {}, reducerName, tableData, action, thunk, loadData, state } = props;
    const [ tableInternalState, dispatch ] = useReducer(tableReducer, {
        isPrinting: false,
        isEditing: !!config.editing,
        visibleColumnIds: getInitialVisibleColumns(config.columns)
    });
    const {
        toolbar = [],
        pagination = {},
        filterable,
        headers,
        height,
        rowHeight,
        styles = {},
        columns,
        entity = {},
        editable,
        primaryKey
    } = config;
    const { visibleColumnIds, isPrinting, isEditing } = tableInternalState;
    const visibleColumns = visibleColumnIds.reduce((result, currentIndex) => {
        const { [currentIndex]: column } = columns;
        return [ ...result, column ];
    }, []);

    const tableConfig = {
        ...config,
        updateTableState: dispatch,
        visibleColumns
    };

    useEffect(() => {
        loadData();
    }, []);

    // Handle Table scrolling
    let tableHeader = useRef({});
    let tableBody = useRef({});
    const [ top, pointerEvents ] = useTableScroll(tableBody, tableHeader);
    // Set min-width of the table
    const [ minWidth ] = useState(calculateWidth(columns));
    // Handle table columns and width
    const [ width, widthAdjustment ] = useTableWidth(tableBody, minWidth, visibleColumns);

    if(!tableData) {
        return (
            <div className="status_message offline">
                <p>
                    The table failed to initialise. Please make sure you are connected to the internet and try again.
                </p>
            </div>
        );
    }

    const tableRenderer = ( isPrinting = false ) => (
        <TableProvider config={{ reducerName, ...tableConfig }}>
            <Container className="rdt-outer-container">
                { !isPrinting && renderToolbar(
                    toolbar,
                    action,
                    thunk,
                    dispatch,
                    columns,
                    editable,
                    isEditing,
                    !_.isEmpty(tableData.modified), // table data has been modified
                    visibleColumnIds,
                    styles.toolbar
                )}
                { !isPrinting && renderPagination('top', query, pagination, action, thunk, styles.pagination) }
                { renderTable({
                    action,
                    bodyExtraData: getExtraBodyRowProps(tableData, tableConfig.visibleColumns),
                    columns: visibleColumns,
                    height: rowHeight * ( tableData.items || [] ).length,
                    isEditing,
                    isFetching,
                    isPrinting,
                    items: tableData.items || [],
                    modified: tableData.modified,
                    pointerEvents,
                    primaryKey,
                    query,
                    rowHeight,
                    schema: entity.schema,
                    state,
                    styles,
                    tableHeader,
                    tableBody,
                    thunk,
                    top,
                    visibleHeight: height || (rowHeight * ( tableData.items || [] ).length),
                    width,
                    widthAdjustment,
                }) }
                { !isPrinting && renderPagination('bottom', query, pagination, action, thunk, styles.pagination) }
            </Container>
        </TableProvider>
    );

    const { query, isFetching } = tableData;
    return (
        <React.Fragment>
            { isPrinting && (
                <Print
                    root={ document.body }
                    internalStateUpdater={ dispatch }
                >
                    { tableRenderer(true) }
                </Print>
            )}
            { !isPrinting && tableRenderer() }
        </React.Fragment>
    );
};

const prepareActionPayload = ({ reducerName, config: { name, routes, entity }}) => (
    ( payload = {} ) => ({ name, reducerName, routes, entity, payload })
);

const mapStateToProps = ( state, { reducerName, config: { name, entity } } ) => ({
    tableData: state[reducerName][name],
    state
});

const mapDispatchToProps = ( dispatch, ownProps ) => {
    let preparePayload = prepareActionPayload(ownProps);
    return {
        loadData: ( ) => {
            dispatch(setPage(preparePayload({ page: 1 })));
            dispatch(setLimit(preparePayload({ limit: ownProps.config.pagination.items.limiter.default || 10 })));
            dispatch(setSort(preparePayload({ dir: 'desc' })));
        },
        action: ( type ) => ( payload ) => dispatch(createActionCreator(type)(preparePayload(payload))),
        thunk: ( thunk, payload ) => dispatch(thunk(preparePayload(payload)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDatatable);
