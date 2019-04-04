import _ from 'lodash';
import React, { useState, useEffect, useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

import TableProvider from './TableProvider';
import Renderer from './Renderer';
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
    }

    useEffect(() => {
        if(typeof tableBody.current.addEventListener === 'function') {
            tableBody.current.addEventListener('scroll', handleScroll, true);
        }
        return () => {
            tableBody.current.removeEventListener('scroll', handleScroll, true);
        }
    }, [ tableBody.current ])

    return [ top, pointerEvents ];
}

const columnsReducer = (state, { type, index }) => {
    var visibleColumns = [ ...state ];
    if(type === 'add') {
        visibleColumns.push(index);
        visibleColumns.sort();
    } else {
        visibleColumns.splice(visibleColumns.indexOf(index), 1).sort();
    }

    return visibleColumns;
}

const useTableWidth = ( tableBody, minWidth, visibleColumns ) => {
    const [ width, setWidth ] = useState(minWidth);
    const [ widthAdjustment, setWidthAdjustment ] = useState(1);

    const updateTableDimensions = ( ) => {
        const tableBodyEl = tableBody.current;
        const computedTableWidth = minWidth > tableBodyEl.clientWidth || !tableBodyEl.clientWidth
            ? minWidth
            : tableBodyEl.clientWidth;

        const percentage = computedTableWidth / calculateWidth(visibleColumns);
        setWidth(calculateWidth(visibleColumns, percentage))
        setWidthAdjustment(percentage);
    }

    useEffect(() => {
        window.addEventListener('resize', updateTableDimensions);
        return () => {
            window.removeEventListener('resize', updateTableDimensions);
        }
    }, []);

    useEffect(() => {
        updateTableDimensions();
    }, [ visibleColumns ]);

    return [ width, widthAdjustment ];
}

const changeSortOrder = ( query, colName, sorter ) => {
    let dir = null;
    if( query.sort != colName ) {
        dir = 'asc';
    } else {
        if(query.dir == 'asc') {
            dir = 'desc';
        } else if(query.dir == 'desc') {
            colName = '';
            dir = '';
        } else {
            dir = 'asc';
        }
    }

    sorter({ sort: colName, dir });
}

const renderToolbar = ( config = [], action, thunk, columnUpdater, columns, visibleColumns, styles ) => (
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
);

const renderPagination = ( position, query, config = {}, action, thunk, styles ) => (
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
            : {}
        return result;
    }, {})
)

const renderTable = ({
    action,
    bodyExtraData = {},
    columns = [],
    height,
    items,
    query = {},
    rowHeight,
    tableHeader,
    tableBody,
    thunk,
    top,
    visibleHeight,
    width,
    widthAdjustment = 1,
    styles
}) => (
    <Container styles={ styles.tableContainer }>
        <Table styles={ styles.table }>
            <Thead ref={ tableHeader } width={ `${width}px` } styles={ styles.thead }>
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
                                onClick={ sortable ? changeSortOrder.bind(this, query, name, action(SET_SORT)) : undefined }
                            >
                                { label }
                                { sortable && sort === name && <SortCaret dir={ dir } /> }
                            </Th>
                        )
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
                                { filterable && <Renderer
                                    ofType="filter"
                                    forItem={ type }
                                    value={ value }
                                    filterer={(key, filter) => action(SET_FILTER)({ key, filter })}
                                    styles={ getStyles(styles.filter, name) }
                                    { ...rest }
                                /> }
                            </Td>
                        )
                    }}
                </Tr>
            </Thead>
            <Tbody
                ref={ tableBody }
                width={ width }
                height={ height }
                data={ items }
                startTop={ top }
                visibleHeight={ visibleHeight }
                rowHeight={ rowHeight }
                styles={ styles.tbody }
            >
                {({ item, top, index: rowIndex }) => (
                    <Tr
                        key={ rowIndex }
                        position="absolute"
                        top={ `${top}px` }
                        columns={ columns }
                        height={ rowHeight }
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
                                    <Renderer
                                        ofType="body"
                                        forItem={ type }
                                        data={ item }
                                        colConfig={ column }
                                        extraData={ bodyExtraData[name] }
                                        action={ action }
                                        thunk={ thunk }
                                        styles={ getStyles(styles.body, name) }
                                    />
                                </Td>
                            );
                        }}
                    </Tr>
                )}
            </Tbody>
        </Table>
    </Container>
);

const ReduxDatatable = ( props ) => {
    const { config = {}, reducerName, tableData, action, thunk, loadData } = props;
    const [ visibleColumns, dispatch ] = useReducer(columnsReducer, _.range(config.columns.length));
    const { toolbar = [], pagination = {}, filterable, headers, height, rowHeight, styles = {}, columns } = config;
    const tableConfig = {
        ...config,
        updateTableState: dispatch,
        visibleColumns: visibleColumns.reduce((result, currentIndex) => [ ...result, columns[currentIndex]], [])
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
    const [ width, widthAdjustment ] = useTableWidth(tableBody, minWidth, tableConfig.visibleColumns);

    if(!tableData) {
        return (
            <div className="status_message offline">
                <p>
                    The table failed to initialise. Please check you are connected to the internet and try again.
                </p>
            </div>
        );
    }

    const { query } = tableData;
    return (
        <TableProvider config={{ reducerName, ...tableConfig }}>
            <Container>
                { renderToolbar(toolbar, action, thunk, dispatch, columns, visibleColumns, styles.toolbar) }
                { renderPagination('top', query, pagination, action, thunk, styles.pagination) }
                { renderTable({
                    action,
                    bodyExtraData: getExtraBodyRowProps(tableData, tableConfig.visibleColumns),
                    columns: tableConfig.visibleColumns,
                    height: rowHeight * ( tableData.items || [] ).length,
                    items: tableData.items || [],
                    pointerEvents,
                    query,
                    rowHeight,
                    tableHeader,
                    tableBody,
                    thunk,
                    top,
                    visibleHeight: height,
                    width,
                    widthAdjustment,
                    styles
                }) }
                { renderPagination('bottom', query, pagination, action, thunk, styles.pagination) }
            </Container>
        </TableProvider>
    );
}

const prepareActionPayload = ({ reducerName, config: { name, routes, entity }}) =>
    ( payload = {} ) => ({ name, reducerName, routes, entity, payload })

const mapStateToProps = ( state, { reducerName, config: { name } } ) => ({
    tableData: state[reducerName][name]
});

const mapDispatchToProps = ( dispatch, ownProps ) => {
    let preparePayload = prepareActionPayload(ownProps);
    return {
        loadData: ( ) => {
            dispatch(setPage(preparePayload({ page: 1 })))
            dispatch(setLimit(preparePayload({ limit: ownProps.config.pagination.items.limiter.default || 10 })))
            dispatch(setSort(preparePayload({ dir: 'desc' })))
        },
        action: ( type ) => ( payload ) => dispatch(createActionCreator(type)(preparePayload(payload))),
        thunk: ( thunk, payload ) => dispatch(thunk(preparePayload(payload)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDatatable);
