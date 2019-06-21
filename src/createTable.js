import _ from 'lodash';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Layout from './containers/Layout';
import Row from './styled-components/Row';
import Print from './containers/Print';
import * as Components from './components';
import { SET_PAGE, SET_SORT, SET_LIMIT, SET_IS_EDITING, SET_VISIBLE_COLUMN_IDS, SET_TABLE_WIDTH } from './actions';
import { createActionCreator, isObject, calculateWidth, getInitialVisibleColumns, toPascalCase, prepareActionPayload } from './utils';
import ConfigContext from './context';

const ReduxDatatable = ( props ) => {
    const { config = {}, reducerName } = props;
    const { name, layout, components } = config;
    const {
        Table: { columns },
        Limiter = {}
    } = components;

    const minWidth = calculateWidth(columns);
    const dispatch = useDispatch();
    const preparePayload = prepareActionPayload(props, action);
    const action = useCallback(
        ( type ) => ( payload ) => dispatch(createActionCreator(type)(preparePayload(payload))),
        [ dispatch ]
    );
    const thunk = useCallback(( thunk, payload ) => dispatch(thunk(preparePayload(payload))), [ dispatch ]);
    const loadData = useCallback(() => {
        action(SET_PAGE)({ page: 1 });
        action(SET_LIMIT)({ limit: Limiter.default || 10 });
        action(SET_SORT)({ dir: 'desc' });
        action(SET_IS_EDITING)({ value: config.editing });
        action(SET_VISIBLE_COLUMN_IDS)({ ids: getInitialVisibleColumns(columns) });
        action(SET_TABLE_WIDTH)({ width: minWidth, widthAdjustment: 1 });
    }, [ dispatch ]);

    const getVisibleColumns = (columns) => _.memoize((visibleColumnIds) => (
        visibleColumnIds.reduce((result, currentIndex) => {
            const { [currentIndex]: column } = columns;
            return [ ...result, column ];
        }, [])
    ));

    const tableConfig = {
        action,
        config,
        columns,
        thunk,
        defaultLimit: Limiter.default || 10,
        minWidth,
        getData: (selector) => createSelector(
            state => state[reducerName][name] || {},
            selector // of the format (tableData) => {your reponse}
        ),
        getVisibleColumns: getVisibleColumns(columns),
    };

    const isPrinting = useSelector(tableConfig.getData(({ isPrinting }) => isPrinting));

    // Remove pagination props and visibleCOlumns. Create a memoized function in utils and call the function wherever that data is necessary.
    // Add visibleColumnIds, isPrinting and tableWidth to redux state.
    // Remove state and tableData from config
    // Add minWidth to config on component load
    // Create config context and add the config to it.
    // Remove mapPropsToComponent from every component
    // Use redux useSelector hook in all the components that need a slice of the state.
    // Remove connect from the this file and use useDispatch (if possible)
    // Change render function in this file to remove mapPropsToComponent, and all the other props except key and name
    // Get all the config using useContext in their respective component files.
    // Make sure context never changes, only state changes


    // Fetch data and populate table on first load.
    useEffect(() => {
        loadData();
    }, []);

    const getComponent = (id) => {
        if (!!id === false) {
            throw '"id" is a required field in layout item object';
        }

        const componentConfig = _.get(components, id, false);
        if (componentConfig !== false && !!componentConfig.renderer === true) {
            return componentConfig.renderer({ componentConfig });
        }

        const type = toPascalCase(componentConfig.type || id);
        return {
            Component: Components[type],
            componentConfig,
            type
        };
    }

    const render = (layout) => (
        <Layout config={ layout } row={ Row }>
            {(item, index) => {
                var id = item;
                if (isObject(item)) {
                    const { Component } = getComponent(item.id);
                    return <Component key={ index }>{ render(item.layout) }</Component>;
                }

                const { Component, componentConfig } = getComponent(id);
                return <Component key={ index } config={ componentConfig } name={ id } />;
            }}
        </Layout>
    );

    return (
        <ConfigContext.Provider value={ tableConfig }>
            { !isPrinting
                ? render(layout)
                : <Print action={ action } root={ document.body }>{ render(layout) }</Print>
            }
        </ConfigContext.Provider>
    );
};

export default ReduxDatatable;
