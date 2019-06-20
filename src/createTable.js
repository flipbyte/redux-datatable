import _ from 'lodash';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Layout from './containers/Layout';
import Row from './styled-components/Row';
import Print from './containers/Print';
import * as Components from './components';
import { SET_PAGE, SET_SORT, SET_LIMIT, SET_IS_EDITING, SET_VISIBLE_COLUMN_IDS, SET_TABLE_WIDTH } from './actions';
import { createActionCreator, isObject, calculateWidth, getInitialVisibleColumns, toPascalCase } from './utils';
import ConfigContext from './context';

const ReduxDatatable = ( props ) => {
    const { config = {}, reducerName } = props;
    const { name, layout, components } = config;
    const {
        Table: { columns },
        Limiter = {}
    } = components;

    // const [ isPrinting, setIsPrinting ] = useState(false);
    // const [ visibleColumnIds, setVisibleColumnIds ] = useState(getInitialVisibleColumns(columns));
    // const [ minWidth ] = useState(calculateWidth(columns));
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

    // const [ scrollData, setScrollData ] = useState({ top: 0, pointerEvents: '', left: 0 });
    // const [ tableWidth, setTableWidth ] = useState({ width: minWidth, widthAdjustment: 1 });

    const tableConfig = {
        action,
        config,
        // tableData,
        thunk,
        defaultLimit: Limiter.default || 10,
        // columns: [ visibleColumnIds, setVisibleColumnIds ],
        // printing: [ isPrinting, setIsPrinting ],
        minWidth,
        // state,
        // width: [ tableWidth, setTableWidth ],
        getData: (selector) => createSelector(
            state => state[reducerName][name] || {},
            selector // of the format (tableData) => {your reponse}
        ),
        getVisibleColumns: getVisibleColumns(columns),
        // paginationProps: useMemo(() => (
        //     calculatePaginationProps(tableData.query, config.components.Limiter.default || 10)
        // ), [ tableData.query ]),
        // visibleColumns: useMemo(() => (
        //     visibleColumnIds.reduce((result, currentIndex) => {
        //         const { [currentIndex]: column } = columns;
        //         return [ ...result, column ];
        //     }, [])
        // ), [ visibleColumnIds ])
    };

    const isPrinting = useSelector(tableConfig.getData(({ isPrinting }) => isPrinting));
    console.log(isPrinting);

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

    // const mapPropsToComponent = ( Component ) => (
    //     (Component.mapPropsToComponent && Component.mapPropsToComponent(tableConfig)) || tableConfig
    // );

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

                    // return (
                    //     <Component
                    //         key={ index }
                    //         { ...mapPropsToComponent(Component) }
                    //     >
                    //         { render(item.layout) }
                    //     </Component>
                    // );
                }

                const { Component, componentConfig } = getComponent(id);
                return <Component key={ index } config={ componentConfig } name={ id } />;
                // return (
                //     <Component
                //         key={ index }
                //         config={ componentConfig }
                //         name={ id }
                //         { ...mapPropsToComponent(Component) }
                //     />
                // );
            }}
        </Layout>
    );

    return (
        <ConfigContext.Provider value={ tableConfig }>
            { !isPrinting
                ? render(layout)
                : <Print setIsPrinting={ setIsPrinting } root={ document.body }>{ render(layout) }</Print>
            }
        </ConfigContext.Provider>
    );
};

const prepareActionPayload = ({
    reducerName,
    config: { name, routes, entity, primaryKey }
}, action) => (
    ( payload = {} ) => ({ name, reducerName, routes, entity, payload, action, primaryKey })
);

// const mapStateToProps = (
//     state,
//     {
//         reducerName,
//         config: { name, entity }
//     }
// ) => ({
//     tableData: state[reducerName][name],
//     state
// });
//
// const mapDispatchToProps = ( dispatch, ownProps ) => {
//     const preparePayload = prepareActionPayload(ownProps, action);
//     const action = ( type ) => ( payload ) => dispatch(createActionCreator(type)(preparePayload(payload)));
//     return {
//         action,
//         loadData: ( ) => {
//             dispatch(setPage(preparePayload({ page: 1 })));
//             dispatch(setLimit(preparePayload({ limit: ownProps.config.components.Limiter.default || 10 })));
//             dispatch(setSort(preparePayload({ dir: 'desc' })));
//             dispatch(setIsEditing(preparePayload({ value: ownProps.config.editing })))
//
//         },
//         thunk: ( thunk, payload ) => dispatch(thunk(preparePayload(payload)))
//     };
// };

export default ReduxDatatable;
