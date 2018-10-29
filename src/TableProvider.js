import React, { Component } from 'react';
import _ from 'lodash';

const ConfigContext = React.createContext({});

const TableProvider = ({ config, children }) => {
    return <ConfigContext.Provider value={ config }>{ children }</ConfigContext.Provider>
}

export const TableConsumer = ({ children }) =>
    <ConfigContext.Consumer>
        { config => (
            children({ config })
        )}
    </ConfigContext.Consumer>

export const withTableConfig = ( paths ) => ( WrappedComponent ) => {
    const ComponentWithConfig = ( props ) =>
        <TableConsumer>
            { config => {
                var tableConfig = {};
                if(_.isObject(paths)) {
                    _.forEach(paths, function( value, key ) {
                        tableConfig[key] = _.get(config.config, value, undefined)
                    });
                } else {
                    tableConfig = paths ? _.get(config.config, paths, false) : config;
                }

                return <WrappedComponent config={ tableConfig } { ...props } />
            } }
        </TableConsumer>

    return ComponentWithConfig;
}


export default TableProvider;
