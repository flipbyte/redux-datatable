import * as actions from './actions';
import objectAssignDeep from 'object-assign-deep';

let initialTableState = {
    isFetching: false,
    title: "",
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
}

const updateState = ( state, tableName ) => ( newState ) => {
    var updatedState = objectAssignDeep({}, initialTableState, state[tableName], newState);
    return {
        ...state,
        [tableName]: {
            ...state[tableName],
            ...updatedState
        }
    }
}

const getTableState = ( name ) => ( state ) => {
    return state[name] ? state[name] : initialTableState;
}

export default function reducer(state = {}, action) {
    if(!action.meta) {
        return state;
    }

    const { payload, meta: { name } } = action;
    const tableState = getTableState(name);
    const stateUpdater = updateState(state, name);

    switch (action.type) {
        case actions.REQUEST_DATA:
            return stateUpdater({ isFetching: true });

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
                query: {
                    page: payload.page,
                    offset: offset
                },
            });

        case actions.SET_SORT:
            return stateUpdater({
                query: {
                    sort: payload.sort,
                    dir: payload.dir
                },
            });

        case actions.SET_LIMIT:
            return stateUpdater({
                query: {
                    limit: parseInt(payload.limit),
                    offset: (tableState(state).query.page - 1) * tableState(state).query.limit
                },
            });

        case actions.SET_FILTER:
            return stateUpdater({
                query: {
                    search: {
                        [payload.key]: payload.filter
                    }
                }
            });

        case actions.SET_SELECTION:
            let selection = {};
            if( typeof payload.key == 'object') {
                payload.key.map(key => selection[key] = payload.value)
            } else {
                selection[payload.key] = payload.value;
            }

            return stateUpdater({
                selection: {
                    [payload.paramKey]: {
                        ...selection
                    }
                }
            });
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

        case action.CLEAR_FILTER:
            return {
                ...state,
                [name]: {
                    ...state[name],
                    query: {
                        ...state[name].query,
                        search: {
                            ...state[name].query.search,
                            ...{}
                        }
                    }
                }
            }

        default:
            return state;
    }
}
