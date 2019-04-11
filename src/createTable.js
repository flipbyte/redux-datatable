import _ from 'lodash';
import React, { useState, useEffect, useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';

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
import SortCaret from './components/SortCaret';
import ExtendedDiv from './components/ExtendedDiv';
import { createActionCreator, isArray, getStyles } from './utils';
import { setPage, setLimit, setSort, SET_SORT, SET_FILTER } from './actions';

const calculateWidth = ( columns, adjustment = 1 ) => (
    columns.reduce((result, column) => (
        result + ((column.width * adjustment) || 0)
    ), 0)
);

const useTableScroll = ( tableBody, tableHeader ) => {
    const [ pointerEvents, setPointerEvents ] = useState('');
    const [ top, setTop ] = useState(0);

    const scrollEnded = _.debounce(() => setPointerEvents(''), 150);
    const handleScroll = () => {
        tableHeader.current.scrollLeft = tableBody.current.scrollLeft;
        setPointerEvents('none');
        setTop(tableBody.current.scrollTop);
    };

    useEffect(() => {
        if(typeof tableBody.current.addEventListener === 'function') {
            tableBody.current.addEventListener('scroll', handleScroll, true);
        }
        return () => {
            tableBody.current.removeEventListener('scroll', handleScroll, true);
        };
    }, [ tableBody.current ]);

    return [ top, pointerEvents ];
};

const columnsReducer = (state, { type, index }) => {
    var visibleColumnIds = [ ...state ];
    if(type === 'add') {
        visibleColumnIds.push(index);
        visibleColumnIds.sort();
    } else {
        visibleColumnIds.splice(visibleColumnIds.indexOf(index), 1).sort();
    }

    return visibleColumnIds;
};

const useTableWidth = ( tableBody, minWidth, visibleColumns ) => {
    const [ width, setWidth ] = useState(minWidth);
    const [ widthAdjustment, setWidthAdjustment ] = useState(1);

    const updateTableDimensions = ( ) => {
        const tableBodyEl = tableBody.current;
        const computedTableWidth = minWidth > tableBodyEl.clientWidth || !tableBodyEl.clientWidth
            ? minWidth
            : tableBodyEl.clientWidth;

        const percentage = computedTableWidth / calculateWidth(visibleColumns);
        setWidth(calculateWidth(visibleColumns, percentage));
        setWidthAdjustment(percentage);
    };

    useEffect(() => {
        window.addEventListener('resize', updateTableDimensions);
        return () => {
            window.removeEventListener('resize', updateTableDimensions);
        };
    }, []);

    useEffect(() => {
        updateTableDimensions();
    }, [ visibleColumns ]);

    return [ width, widthAdjustment ];
};

const changeSortOrder = ( query, colName, sorter ) => {
    let dir = null;
    if( query.sort !== colName ) {
        dir = 'asc';
    } else {
        if(query.dir === 'asc') {
            dir = 'desc';
        } else if(query.dir === 'desc') {
            colName = '';
            dir = '';
        } else {
            dir = 'asc';
        }
    }

    sorter({ sort: colName, dir });
};

const prepareData = ( item, schema, state ) => {
    if (_.isEmpty(schema) || _.isObject(item)) {
        return item;
    }

    return denormalize(item, schema, state);
};

const renderToolbar = ( config = [], action, thunk, columnUpdater, columns, visibleColumns, styles = {} ) => (
    <Row>
        <Toolbar items={ config } styles={ styles }>
            {({ state, ...itemConfig }) => (
                <Renderer
                    ofType="toolbar"
                    forItem={ itemConfig.type }
                    itemConfig={ itemConfig }
                    action={ action }
                    thunk={ thunk }
                    columnUpdater={ columnUpdater }
                    columns={ columns }
                    visibleColumns={ visibleColumns }
                />
            )}
        </Toolbar>
    </Row>
);

const renderPagination = ( position, query, config = {}, action, thunk, styles = {} ) => (
    <Row>
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

const getExtraBodyRowProps = (data, columns) => (
    columns.reduce((result = {}, { name, extraData }) => {
        result[name] = extraData
            ? isArray(extraData)
                ? extraData.reduce((edResult, dataKey) => {
                    if(isArray(dataKey)) {
                        edResult[dataKey[1] || dataKey[0]] = _.get(data, dataKey[0]);
                    } else {
                        edResult[dataKey] = _.get(data, dataKey);
                    }

                    return edResult;
                }, {})
                : { [extraData]: _.get(data, extraData) }
            : {};
        return result;
    }, {})
);

const renderTable = ({
    action,
    bodyExtraData = {},
    columns = [],
    height,
    items,
    query = {},
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
    <Container styles={ getStyles(styles, 'tableContainer') }>
        <Table styles={ getStyles(styles, 'table') }>
            <Thead ref={ tableHeader } width={ `${width}px` } styles={ getStyles(styles, 'thead') }>
                <Tr columns={ columns } styles={ getStyles(styles.tr, 'header') }>
                    {({ sortable, width, textAlign, name, label }, index) => {
                        const { sort, dir } = query;
                        return (
                            <Th
                                key={ index }
                                sortable={ sortable }
                                width={ width * widthAdjustment }
                                textAlign={ textAlign }
                                styles={ styles.th }
                                onClick={ sortable ? changeSortOrder.bind(this, query, name, action(SET_SORT)) : null }
                            >
                                <label>
                                    { label }
                                    { sortable && sort === name && <SortCaret dir={ dir } /> }
                                </label>
                            </Th>
                        );
                    }}
                </Tr>
                <Tr columns={ columns } styles={ getStyles(styles.tr, 'filter') }>
                    {({ filterable, type, width, ...rest }, index) => {
                        const { name } = rest;
                        const value = _.get(query, ['search', name, 'value']);
                        return (
                            <Td
                                key={ index }
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
                ref={ tableBody }
                width={ width }
                height={ `${height > visibleHeight ? visibleHeight : height}px` }
                innerHeight={ height }
                data={ items }
                startTop={ top }
                visibleHeight={ visibleHeight }
                rowHeight={ rowHeight }
                styles={ getStyles(styles, 'tbody') }
            >
                {({ item, top, index: rowIndex }) => {
                    var data = prepareData(item, schema, state);
                    return (
                        <Tr
                            key={ rowIndex }
                            position="absolute"
                            top={ `${top}px` }
                            columns={ columns }
                            height={ `${rowHeight}px` }
                            even={ rowIndex % 2 === 0 }
                            styles={ getStyles(styles.tr, 'body') }
                        >
                            {(column, index) => {
                                const { width, textAlign, name, type } = column;
                                return (
                                    <Td
                                        key={ index }
                                        width={ `${width * widthAdjustment}px` }
                                        styles={ getStyles(styles.td, 'body') }
                                    >
                                        <ExtendedDiv styles={ getStyles(styles.body, name) }>
                                            <Renderer
                                                ofType="body"
                                                forItem={ type }
                                                data={ data }
                                                colConfig={ column }
                                                extraData={ bodyExtraData[name] }
                                                action={ action }
                                                thunk={ thunk }
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
    const [ visibleColumnIds, dispatch ] = useReducer(columnsReducer, _.range(config.columns.length));
    const { toolbar = [], pagination = {}, filterable, headers, height, rowHeight, styles = {}, columns, entity = {} } = config;

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

    const { query } = tableData;
    return (
        <TableProvider config={{ reducerName, ...tableConfig }}>
            <Container>
                { renderToolbar(toolbar, action, thunk, dispatch, columns, visibleColumnIds, styles.toolbar) }
                { renderPagination('top', query, pagination, action, thunk, styles.pagination) }
                { renderTable({
                    action,
                    bodyExtraData: getExtraBodyRowProps(tableData, tableConfig.visibleColumns),
                    columns: visibleColumns,
                    height: rowHeight * ( tableData.items || [] ).length,
                    items: tableData.items || [],
                    pointerEvents,
                    query,
                    rowHeight,
                    schema: entity.schema,
                    state,
                    styles,
                    tableHeader,
                    tableBody,
                    thunk,
                    top,
                    visibleHeight: height,
                    width,
                    widthAdjustment,
                }) }
                { renderPagination('bottom', query, pagination, action, thunk, styles.pagination) }
            </Container>
        </TableProvider>
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
