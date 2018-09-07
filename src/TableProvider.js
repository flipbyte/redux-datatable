import React, { Component } from 'react';

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

export default TableProvider;
