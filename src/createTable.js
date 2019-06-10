import _ from 'lodash';
import React, { useState, useEffect, useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { TableProvider } from './TableProvider';
import * as InternalComponents from './components';
import Layout from './containers/Layout';
import Row from './styled-components/Row';
// import Table from './styled-components/Table';
// import Thead from './styled-components/Thead';
// import Tbody from './styled-components/Tbody';
// import Tr from './styled-components/Tr';
// import Th from './styled-components/Th';
// import Td from './styled-components/Td';
// import Container from './styled-components/Container';
// import ExtendedDiv from './styled-components/ExtendedDiv';
// import Print from './styled-components/Print';
import { useTableWidth, useTableScroll } from './hooks';
import { setPage, setLimit, setSort, SET_SORT, SET_FILTER, MODIFY_DATA } from './actions';
import { ADD_COLUMN, REMOVE_COLUMN, SET_IS_PRINTING, TOGGLE_EDITABLE } from './constants';
import {
    createActionCreator,
    isArray,
    isObject,
    getStyles,
    getExtraBodyRowProps,
    calculateWidth,
    prepareData,
    getInitialVisibleColumns,
    changeSortOrder,
    calculatePaginationProps
} from './utils';
import * as Components from './components';

// const tableReducer = ( state, { type, value }) => {
//     const options = {
//         [ADD_COLUMN]: () => {
//             let visibleColumnIds = [ ...state.visibleColumnIds ];
//             visibleColumnIds.push(value);
//             visibleColumnIds.sort();
//             return { ...state, visibleColumnIds }
//         },
//         [REMOVE_COLUMN]: () => {
//             let visibleColumnIds = [ ...state.visibleColumnIds ];
//             visibleColumnIds.splice(visibleColumnIds.indexOf(value), 1).sort();
//             return { ...state, visibleColumnIds }
//         },
//         [SET_IS_PRINTING]: () => {
//             return { ...state, isPrinting: value };
//         },
//         [TOGGLE_EDITABLE]: () => {
//             return { ...state, isEditing: !state.isEditing }
//         }
//     }
//
//     return options[type]();
// }

// const renderToolbar = (
//     config = [],
//     action,
//     thunk,
//     internalStateUpdater,
//     columns,
//     editable,
//     isEditing,
//     isModified,
//     visibleColumns,
//     styles = {}
// ) => (
//     <Row className="rdt-toolbar-row">
//         <Toolbar items={ config } styles={ styles }>
//             {({ state, ...itemConfig }) => (
//                 <Renderer
//                     ofType="toolbar"
//                     forItem={ itemConfig.type }
//                     itemConfig={ itemConfig }
//                     action={ action }
//                     thunk={ thunk }
//                     internalStateUpdater={ internalStateUpdater }
//                     columns={ columns }
//                     visibleColumns={ visibleColumns }
//                     isModified={ isModified }
//                     isEditable={ editable }
//                     isEditing={ isEditing }
//                 />
//             )}
//         </Toolbar>
//     </Row>
// );
//
// const renderPagination = ( position, query, config = {}, action, thunk, styles = {} ) => (
//     <Row className={ `rdt-pagination-row ${position}` }>
//         <Pagination position={ position } config={ config } query={ query } styles={ styles }>
//             {(item, paginationProps) => (
//                 <Renderer
//                     ofType="pagination"
//                     forItem={ item.type }
//                     action={ action }
//                     { ...item }
//                     { ...paginationProps }
//                 />
//             )}
//         </Pagination>
//     </Row>
// );
//
// const renderTable = ({
//     action,
//     bodyExtraData = {},
//     columns = [],
//     height,
//     isFetching,
//     isEditing,
//     isPrinting,
//     items,
//     modified = {},
//     query = {},
//     pointerEvents,
//     primaryKey,
//     rowHeight,
//     schema,
//     state = {},
//     styles = {},
//     tableHeader,
//     tableBody,
//     thunk,
//     top,
//     visibleHeight,
//     width,
//     widthAdjustment = 1,
// }) => (
//     <Container className="rdt-inner-container" styles={ getStyles(styles, 'tableContainer') }>
//         <Table className="rdt-table" styles={ getStyles(styles, 'table') }>
//             <Thead className="rdt-table-head" ref={ tableHeader } width={ `${width}px` } styles={ getStyles(styles, 'thead') }>
//                 <Tr className="rdt-table-row" columns={ columns } styles={ getStyles(styles.tr, 'header') }>
//                     {({ sortable, width, textAlign, name, type, ...rest }, index) => {
//                         const { sort, dir } = query;
//                         return (
//                             <Th
//                                 key={ index }
//                                 className={ `rdt-th ${name} ${type}` }
//                                 sortable={ sortable }
//                                 width={ width * widthAdjustment }
//                                 textAlign={ textAlign }
//                                 styles={ styles.th }
//                                 onClick={ sortable ? changeSortOrder.bind(this, query, name, action(SET_SORT)) : null }
//                             >
//                                 <Renderer
//                                     ofType="header"
//                                     forItem={ type }
//                                     name={ name }
//                                     sortable={ sortable }
//                                     sort={ sort }
//                                     dir={ dir }
//                                     action={ action }
//                                     { ...rest }
//                                 />
//                             </Th>
//                         );
//                     }}
//                 </Tr>
//                 <Tr className="rdt-table-row" columns={ columns } styles={ getStyles(styles.tr, 'filter') }>
//                     {({ filterable, type, width, ...rest }, index) => {
//                         const { name } = rest;
//                         const value = _.get(query, ['search', name, 'value']);
//                         return (
//                             <Td
//                                 key={ index }
//                                 className={ `rdt-table-col filter ${name} ${type}` }
//                                 width={ `${width * widthAdjustment}px` }
//                                 styles={ getStyles(styles.td, 'filter') }
//                             >
//                                 { filterable && <ExtendedDiv styles={ getStyles(styles.filter, name) }>
//                                     <Renderer
//                                         ofType="filter"
//                                         forItem={ type }
//                                         value={ value }
//                                         filterer={(key, filter) => action(SET_FILTER)({ key, filter })}
//                                         { ...rest }
//                                     />
//                                 </ExtendedDiv> }
//                             </Td>
//                         );
//                     }}
//                 </Tr>
//             </Thead>
//             <Tbody
//                 className="rdt-table-body"
//                 ref={ tableBody }
//                 width={ width }
//                 height={ height > visibleHeight ? visibleHeight : height }
//                 innerHeight={ height }
//                 data={ items }
//                 startTop={ top }
//                 isFetching={ isFetching }
//                 isPrinting={ isPrinting }
//                 visibleHeight={ visibleHeight }
//                 rowHeight={ rowHeight }
//                 loaderStyles={ getStyles(styles, 'loader') }
//                 styles={ getStyles(styles, 'tbody') }
//                 windowing={ true }
//             >
//                 {({ item, top, index: rowIndex }) => {
//                     const data = prepareData(item, schema, state);
//                     const primarKeyValue = _.get(data, primaryKey);
//                     const modifiedData = modified[primarKeyValue] || {};
//                     return (
//                         <Tr
//                             key={ rowIndex }
//                             className="rdt-table-row"
//                             position="absolute"
//                             top={ `${top}px` }
//                             columns={ columns }
//                             height={ `${rowHeight}px` }
//                             even={ rowIndex % 2 === 0 }
//                             styles={ getStyles(styles.tr, 'body') }
//                         >
//                             {(column, index) => {
//                                 const { width, textAlign, name, type } = column;
//                                 const ColRenderer = column.renderer || Renderer;
//                                 const modifiedValue = _.get(modifiedData, name);
//                                 const origValue = _.get(data, name);
//                                 const value = modifiedValue || origValue;
//                                 return (
//                                     <Td
//                                         key={ index }
//                                         className={ `rdt-table-col ${name} ${type}` }
//                                         width={ `${width * widthAdjustment}px` }
//                                         styles={ getStyles(styles.td, 'body') }
//                                     >
//                                         <ExtendedDiv className="rdt-table-col-inner" styles={ getStyles(styles.body, name) }>
//                                             <ColRenderer
//                                                 ofType="body"
//                                                 forItem={ type }
//                                                 data={ data }
//                                                 value={ value }
//                                                 colConfig={ column }
//                                                 extraData={ bodyExtraData[name] }
//                                                 action={ action }
//                                                 thunk={ thunk }
//                                                 isEditing={ isEditing }
//                                                 origValue={ origValue }
//                                                 modifiedData={ modifiedData }
//                                                 isModified={ _.has(modifiedData, name) }
//                                                 modifiedValue={ modifiedValue }
//                                                 handleChange={(event) => {
//                                                     var newData = { ...modifiedData };
//                                                     _.set(newData, primaryKey, primarKeyValue);
//                                                     _.set(newData, event.target.name, event.target.value);
//                                                     action(MODIFY_DATA)({ key: primarKeyValue, value: newData })
//                                                 }}
//                                             />
//                                         </ExtendedDiv>
//                                     </Td>
//                                 );
//                             }}
//                         </Tr>
//                     );
//                 }}
//             </Tbody>
//         </Table>
//     </Container>
// );


const ReduxDatatable = ({ config = {}, reducerName, tableData, action, thunk, loadData }) => {
    const { layout, components } = config;

    const [ isPrinting, setIsPrinting ] = useState(false);
    const [ visibleColumnIds, setVisibleColumnIds ] = useState(getInitialVisibleColumns(config.components.table));
    const [ isEditing, setIsEditing ] = useState(!!config.isEditing);
    const [ minWidth ] = useState(calculateWidth(config.components.table));

    const tableConfig = {
        action,
        config,
        tableData,
        thunk,
        columns: [ visibleColumnIds, setVisibleColumnIds ],
        editing: [ isEditing, setIsEditing ],
        printing: [ isPrinting, setIsPrinting ],
        paginationProps: (tableData && calculatePaginationProps(tableData.query, config.components.Limiter.default || 10)) || {},
        minWidth
    };

    // Fetch data and populate table on first load.
    useEffect(() => {
        loadData();
    }, []);

    const mapPropsToComponent = ( Component ) =>
        (Component.mapPropsToComponent && Component.mapPropsToComponent(tableConfig)) || tableConfig;

    const render = (layout) => (
        <Layout config={ layout } row={ Row }>
            {(item, index) => {
                var id = item;
                if (isObject(item)) {
                    // id = item.type;
                    return render(item.layout);
                }

                if (!!id === false) {
                    throw '"type" is a required field in layout item object';
                }

                const componentConfig = _.get(components, id, false);
                console.log(componentConfig);
                if (componentConfig !== false && !!componentConfig.renderer === true) {
                    return componentConfig.renderer({ componentConfig });
                }

                const type = _.chain(componentConfig.type || id).camelCase().upperFirst().value();
                const Component = InternalComponents[type];
                console.log(type, Component);
                return (
                    <Component
                        key={ index }
                        config={ componentConfig }
                        { ...mapPropsToComponent(Component) }
                    />
                );
            }}
        </Layout>
    );

    return (
        <TableProvider
            config={ config }
            reducerName={ reducerName }
            tableData={ tableData }
            action={ action }
            thunk={ thunk }
        >
            { render(layout) }
        </TableProvider>
    );
};

const prepareActionPayload = ({
    reducerName,
    config: { name, routes, entity }
}, action) => (
    ( payload = {} ) => ({ name, reducerName, routes, entity, payload, action })
);

const mapStateToProps = (
    state,
    {
        reducerName,
        config: { name, entity }
    }
) => ({
    tableData: state[reducerName][name],
    state
});

const mapDispatchToProps = ( dispatch, ownProps ) => {
    const action = ( type ) => ( payload ) => dispatch(createActionCreator(type)(preparePayload(payload)));
    const preparePayload = prepareActionPayload(ownProps, action);
    return {
        action,
        loadData: ( ) => {
            dispatch(setPage(preparePayload({ page: 1 })));
            dispatch(setLimit(preparePayload({ limit: ownProps.config.components.Limiter.default || 10 })));
            dispatch(setSort(preparePayload({ dir: 'desc' })));
        },
        thunk: ( thunk, payload ) => dispatch(thunk(preparePayload(payload)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDatatable);
