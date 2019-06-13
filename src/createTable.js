import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from './containers/Layout';
import Row from './styled-components/Row';
import { setPage, setLimit, setSort, SET_SORT, SET_FILTER, MODIFY_DATA } from './actions';
import { ADD_COLUMN, REMOVE_COLUMN, SET_IS_PRINTING, TOGGLE_EDITABLE } from './constants';
import {
    createActionCreator,
    isObject,
    calculateWidth,
    getInitialVisibleColumns,
    calculatePaginationProps,
    toPascalCase
} from './utils';
import * as Components from './components';

const ReduxDatatable = ({ config = {}, reducerName, tableData = {}, action, thunk, loadData, state }) => {
    const { layout, components } = config;
    const { Table: columns } = components;

    const [ isPrinting, setIsPrinting ] = useState(false);
    const [ visibleColumnIds, setVisibleColumnIds ] = useState(getInitialVisibleColumns(columns));
    const [ isEditing, setIsEditing ] = useState(!!config.isEditing);
    const [ minWidth ] = useState(calculateWidth(columns));
    const [ scrollData, setScrollData ] = useState({ top: 0, pointerEvents: '', left: 0 });
    const [ tableWidth, setTableWidth ] = useState({ width: minWidth, widthAdjustment: 1 });

    const tableConfig = {
        action,
        config,
        tableData,
        thunk,
        columns: [ visibleColumnIds, setVisibleColumnIds ],
        editing: [ isEditing, setIsEditing ],
        printing: [ isPrinting, setIsPrinting ],
        paginationProps: calculatePaginationProps(tableData.query, config.components.Limiter.default || 10),
        minWidth,
        state,
        scroller: [ scrollData, setScrollData ],
        width: [ tableWidth, setTableWidth ],
        visibleColumns: visibleColumnIds.reduce((result, currentIndex) => {
            const { [currentIndex]: column } = columns;
            return [ ...result, column ];
        }, [])
    };

    // Fetch data and populate table on first load.
    useEffect(() => {
        loadData();
    }, []);

    const mapPropsToComponent = ( Component ) => (
        (Component.mapPropsToComponent && Component.mapPropsToComponent(tableConfig)) || tableConfig
    );

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
                    return (
                        <Component key={ index }>{ render(item.layout) }</Component>
                    );
                }

                const { Component, componentConfig } = getComponent(id);
                return (
                    <Component
                        key={ index }
                        config={ componentConfig }
                        name={ id }
                        { ...mapPropsToComponent(Component) }
                    />
                );
            }}
        </Layout>
    );

    return render(layout);
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
