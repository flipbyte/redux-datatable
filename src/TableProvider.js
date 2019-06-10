import _ from 'lodash';
import React, { Component, useState } from 'react';
import { getInitialVisibleColumns, calculatePaginationProps, calculateWidth } from './utils';

const TableContext = React.createContext(null);

export const TableProvider = ({ config = {}, tableData = {}, action, thunk, children }) => {
    const [ isPrinting, setIsPrinting ] = useState(false);
    const [ visibleColumnIds, setVisibleColumnIds ] = useState(getInitialVisibleColumns(config.components.table));
    const [ isEditing, setIsEditing ] = useState(!!config.isEditing);
    const [ minWidth ] = useState(calculateWidth(config.components.table));

    return (
        <TableContext.Provider value={{
            action,
            config,
            tableData,
            thunk,
            columns: [ visibleColumnIds, setVisibleColumnIds ],
            editing: [ isEditing, setIsEditing ],
            printing: [ isPrinting, setIsPrinting ],
            paginationProps: tableData.query && calculatePaginationProps(tableData.query, config.components.Limiter.default || 10),
            minWidth
        }}>
            { children }
        </TableContext.Provider>
    )
}


// const ConfigContext = React.createContext({});

// const TableProvider = ({ config, children }) => (
//     <ConfigContext.Provider value={ config }>{ children }</ConfigContext.Provider>
// );
//
// export const TableConsumer = ({ children }) => (
//     <ConfigContext.Consumer>
//         { (config) => (
//             children({ config })
//         )}
//     </ConfigContext.Consumer>
// );

// export const withTableConfig = ( paths ) => ( WrappedComponent ) => {
//     const ComponentWithConfig = ( props ) => (
//         <TableConsumer>
//             { (config) => {
//                 var tableConfig = {};
//                 if(_.isObject(paths)) {
//                     _.forEach(paths, ( value, key ) => {
//                         tableConfig = {
//                             ...tableConfig,
//                             [key]: _.get(config.config, value)
//                         };
//                     });
//                 } else {
//                     tableConfig = paths ? _.get(config.config, paths, false) : config;
//                 }
//
//                 return <WrappedComponent config={ tableConfig } { ...props } />;
//             } }
//         </TableConsumer>
//     );
//
//     return ComponentWithConfig;
// };
//
export default TableContext;
