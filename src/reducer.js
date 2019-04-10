import * as actions from './actions';
import objectAssignDeep from 'object-assign-deep';
import _ from 'lodash';

let initialTableState = {
    isFetching: false,
    title: '',
    name: '',
    items: [],
    query: {
        dir: 'desc',
        sort: null,
        page: 0,
        limit: 20,
        offset: 0,
        count: 0,
        search: {}
    },
    selection: {}
};

const updateState = ( state, tableName ) => ( newState ) => {
    var updatedState = objectAssignDeep({}, initialTableState, state[tableName], newState);
    return {
        ...state,
        [tableName]: {
            ...state[tableName],
            ...updatedState
        }
    };
};

const getTableState = ( name ) => ( state ) => (
    state[name] ? state[name] : initialTableState
);

export default function reducer(state = {}, action) {
    if (!action.meta) {
        return state;
    }

    const { payload, meta: { name } } = action;
    const tableState = getTableState(name);
    const stateUpdater = updateState(state, name);

    switch (action.type) {
        case actions.REQUEST_DATA:
            return stateUpdater({ isFetching: true });

        case actions.REQUEST_DATA_CANCEL:
            return stateUpdater({ isFetching: false });

        case actions.RECEIVE_DATA:
            return stateUpdater({
                isFetching: false,
                query: {
                    count: parseInt(payload.response.total)
                },
                items: payload.data,
                selection: {}
            });

        case actions.SET_PAGE:
            let offset =  ( (payload.page - 1) * tableState(state).query.limit );
            offset = offset > 0 ? offset : 0;

            return stateUpdater({
                isFetching: true,
                query: {
                    page: payload.page,
                    offset: offset
                },
            });

        case actions.SET_SORT:
            return stateUpdater({
                isFetching: true,
                query: {
                    sort: payload.sort,
                    dir: payload.dir
                },
            });

        case actions.SET_LIMIT:
            return stateUpdater({
                isFetching: true,
                query: {
                    limit: parseInt(payload.limit),
                    offset: (tableState(state).query.page - 1) * tableState(state).query.limit
                },
            });

        case actions.SET_FILTER:
            var updatedFilters = {};
            if(!payload.clear) {
                updatedFilters = {
                    ...state[name].query.search,
                    [payload.key]: payload.filter
                };
            }

            return {
                ...state,
                [name]: {
                    ...state[name],
                    query: {
                        ...state[name].query,
                        search: {
                            ...updatedFilters
                        }
                    },
                    isFetching: true
                }
            };

        case actions.SET_SELECTION:
            let selection = {};
            if( typeof payload.key == 'object') {
                selection[payload.paramKey] = payload.key;
            } else {
                selection = _.get(tableState(state), 'selection', {});
                if(_.isEmpty(selection[payload.paramKey])) {
                    selection[payload.paramKey] = {};
                }
                selection[payload.paramKey][payload.key] = payload.value;
            }

            return {
                ...state,
                [name]: {
                    ...state[name],
                    selection: {
                        ...state[name].selection,
                        ...selection
                    }
                }
            }

            // return stateUpdater({
            //     selection: {
            //         [payload.paramKey]: {
            //             ...selection
            //         }
            //     }
            // });
            // return {
            //     ...state,
            //     selection: {
            //         ...state.selection,
            //         [payload.paramKey]: {
            //             ...state.selection[payload.paramKey],
            //             ...selection
            //         }
            //     }
            // }

        default:
            return state;
    }
};
