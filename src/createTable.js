import _ from 'lodash';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Layout from './containers/Layout';
import Row from './styled-components/Row';
import Print from './containers/Print';
import * as Components from './components';
import ConfigContext from './context';
import {
    createActionCreator,
    isObject,
    calculateWidth,
    toPascalCase,
    prepareActionPayload
} from './utils';
import {
    SET_PAGE,
    SET_SORT,
    SET_LIMIT,
    SET_IS_EDITING
} from './actions';

const getVisibleColumns = (columns) => _.memoize((visibleColumnIds) => (
    visibleColumnIds.reduce((result, currentIndex) => {
        const { [currentIndex]: column } = columns;
        return [ ...result, column ];
    }, [])
));

const ReduxDatatable = ( props ) => {
    const { config = {}, reducerName } = props;
    const { name, layout, components } = config;
    const {
        Table: { columns },
        Limiter = {}
    } = components;

    const minWidth = calculateWidth(columns);
    const dispatch = useDispatch();
    const preparePayload = prepareActionPayload(props);
    const action = useCallback(
        ( type ) => ( payload ) => dispatch(createActionCreator(type)(preparePayload(payload))),
        [ dispatch ]
    );
    const thunk = useCallback(( thunk, payload ) => (
        dispatch(thunk(preparePayload({ ...payload }), action)),
        [ dispatch ]
    ));
    const loadData = useCallback(() => {
        action(SET_PAGE)({ page: 1 });
        action(SET_LIMIT)({ limit: Limiter.default || 10 });
        action(SET_SORT)({ dir: 'desc' });
        action(SET_IS_EDITING)({ value: config.editing });
    }, [ dispatch ]);

    const tableConfig = {
        action,
        config,
        columns,
        thunk,
        defaultLimit: Limiter.default || 10,
        minWidth,
        reducerName,
        getData: (selector) => createSelector(
            state => state[reducerName][name] || {},
            selector // of the format (tableData) => {your reponse}
        ),
        getVisibleColumns: getVisibleColumns(columns),
    };

    const isPrinting = useSelector(tableConfig.getData(({ isPrinting }) => isPrinting));

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
            return {
                Component: componentConfig.renderer,
                componentConfig
            };
        }

        const type = toPascalCase(componentConfig.type || id);
        return {
            Component: Components[type],
            componentConfig,
            type
        };
    };

    const render = (layout) => (
        <Layout config={ layout } row={ Row }>
            {(item, index) => {
                var id = item;
                if (isObject(item)) {
                    const { Component, componentConfig } = getComponent(item.id);
                    return <Component key={ index } config={ componentConfig }>{ render(item.layout) }</Component>;
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
