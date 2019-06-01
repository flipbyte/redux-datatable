import _ from 'lodash';
import * as actions from './actions';
import objectAssignDeep from 'object-assign-deep';
import { SELECT_ALL } from './constants';

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
    selection: {
        all: false,
        selected: {}
    }
};

const updateState = ( state, tableName ) => ( newState ) => {
    const { [tableName]: tableState = {} } = state;
    var updatedState = objectAssignDeep({}, initialTableState, tableState, newState);
    return {
        ...state,
        [tableName]: {
            ...tableState,
            ...updatedState
        }
    };
};

const getTableState = ( name ) => ( state ) => {
    const { [name]: tableState } = state;
    return tableState || initialTableState;
};

export default function reducer(state = {}, action) {
    if (!action.meta) {
        return state;
    }

    const { payload, meta: { name } } = action;
    const tableState = getTableState(name)(state);
    const stateUpdater = updateState(state, name);
    const acceptedActions = {
        [actions.REQUEST_DATA]: () => stateUpdater({ isFetching: true }),
        [actions.REQUEST_DATA_CANCEL]: () => stateUpdater({ isFetching: false }),
        [actions.RECEIVE_DATA]: () => stateUpdater({
            isFetching: false,
            query: {
                count: parseInt(payload.response.total, 10)
            },
            items: payload.data,
            selection: {}
        }),
        [actions.SET_PAGE]: () => {
            let offset =  ( (payload.page - 1) * tableState.query.limit );
            offset = offset > 0 ? offset : 0;

            return stateUpdater({
                isFetching: true,
                query: {
                    page: payload.page,
                    offset
                },
            });
        },
        [actions.SET_SORT]: () => stateUpdater({
            isFetching: true,
            query: {
                sort: payload.sort,
                dir: payload.dir
            },
        }),
        [actions.SET_LIMIT]: () => stateUpdater({
            isFetching: true,
            query: {
                limit: parseInt(payload.limit, 10),
                offset: (tableState.query.page - 1) * tableState.query.limit
            },
        }),
        [actions.SET_FILTER]: () => {
            var updatedFilters = {};
            if(!payload.clear) {
                updatedFilters = {
                    ...tableState.query.search,
                    [payload.key]: payload.filter
                };
            }

            return {
                ...state,
                [name]: {
                    ...tableState,
                    query: {
                        ...tableState.query,
                        search: {
                            ...updatedFilters
                        }
                    },
                    isFetching: true
                }
            };
        },
        [actions.SET_SELECTION]: () => {
            let selection = _.get(tableState, 'selection', {});
            if (payload.type === SELECT_ALL) {
                selection.all = payload.value;
                selection.selected = {};
            } else {
                if (_.isEmpty(selection.selected[payload.paramKey])) {
                    selection.selected[payload.paramKey] = {};
                }
                selection.selected[payload.paramKey][payload.key] = payload.value;
            }

            return {
                ...state,
                [name]: {
                    ...tableState,
                    selection: {
                        ...tableState.selection,
                        ...selection
                    }
                }
            };
        }
    };

    if (acceptedActions.hasOwnProperty(action.type)) {
        return acceptedActions[action.type]();
    }

    return state;
}
