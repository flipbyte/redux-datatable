import React, { Component } from 'react'

import { Observable  } from 'rxjs/Observable';
import { concatMap, switchMap, map, takeUntil, filter } from 'rxjs/operator';
import { of } from 'rxjs/observable/of';
import { denormalize, normalize } from 'normalizr';

import qs from 'qs';

import { createActionCreator, createReducer, defaultLimiterCongig, getRoute } from './utils';
import * as actions from './actions';
import get from 'lodash/get';

export default ( props ) => Table => {
    const {
        name,
        url,
        routes,
        config,
        statePath,
        resultPath,
        limiterConfig = defaultLimiterCongig
    } = props;

    class FlutterTable extends Component {
        componentWillMount() {
            this.props.loadData();
        }

        componentWillUnmount() {
            this.props.clearMessage();
        }

        setValidPage(nextProps) {
            if(nextProps.query.count <= 0) {
                return true;
            }

            let totalEntries = parseInt(nextProps.query.count);
            let totalPages = Math.ceil(totalEntries / nextProps.query.limit);
            if(totalPages < this.props.query.page) {
                this.props.setPage(totalPages);
                return false
            }

            return true;
        }

        shouldComponentUpdate(nextProps, nextState) {
            return this.setValidPage(nextProps);
        }

        render() {
            return (
                <Table name={ name }
                    config={ config }
                    limiterConfig={ limiterConfig }
                    { ...this.props } />
            )
        }
    }

    let initialState = {
        isFetching: false,
        title: "",
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
        message: {},
        selection: {}
    }

    const tableReducer = (state = initialState, action) => {
        const { ...payload } = action.payload;
        switch (action.type) {
            case actions.REQUEST_DATA:
                return {
                    ...state,
                    isFetching: true
                }

            case actions.RECEIVE_DATA:
                return {
                    ...state,
                    isFetching: false,
                    query: {
                        ...state.query,
                        count: parseInt(payload.response.total)
                    },
                    items: payload.data,
                    selection: {}
                }

            case actions.SET_PAGE:
                let offset =  ( (payload.page - 1) * state.query.limit );
                offset = offset > 0 ? offset : 0;

                return {
                    ...state,
                    query: {
                        ...state.query,
                        page: payload.page,
                        offset: offset
                    },
                }

            case actions.SET_SORT:
                return {
                    ...state,
                    query: {
                        ...state.query,
                        sort: payload.sort,
                        dir: payload.dir
                    },
                }

            case actions.SET_LIMIT:
                return {
                    ...state,
                    query: {
                        ...state.query,
                        limit: parseInt(payload.limit),
                        offset: (state.query.page - 1) * state.query.limit
                    },
                }

            case actions.SET_FILTER:
                return {
                    ...state,
                    query: {
                        ...state.query,
                        search: {
                            ...state.query.search,
                            [payload.key]: payload.filter
                        }
                    }
                }

            case actions.SET_SELECTION:
                let selection = {};
                if( typeof payload.key == 'object') {
                    payload.key.map(key => selection[key] = payload.value)
                } else {
                    selection[payload.key] = payload.value;
                }

                return {
                    ...state,
                    selection: {
                        ...state.selection,
                        [payload.paramKey]: {
                            ...state.selection[payload.paramKey],
                            ...selection
                        }
                    }
                }

            case actions.SET_MESSAGE:
                return {
                    ...state,
                    message: payload
                };

            default:
                return state;
        }
    }


    const tableEpics = ( name, url, routes, statePath, resultPath, actionCreators ) => {
        const setParamsEpic = ( action$, store ) =>
            action$.ofType(
                actionCreators.setPage().toString(),
                actionCreators.setFilter().toString(),
                actionCreators.setLimit().toString(),
                actionCreators.setSort().toString()
            ).concatMap( action =>
                Observable.of(
                    actionCreators.cancelRequest({ name }),
                    actionCreators.requestData({ query: get(store.getState(), statePath).query })
                )
            );

        const fetchDataEpic = ( action$, store, { api, schemas } ) =>
            action$.ofType(actionCreators.requestData().toString()).switchMap( action =>
                api(
                    getRoute(url, routes.fetch.route, Object.assign({}, routes.fetch.params, action.payload.query))
                        .getFormattedUrl()
                ).map(response => {
                    const requestResponse = get(response, resultPath.fetch.response, null);
                    const result = get(response, resultPath.fetch.data, null);
                    const data = schemas && schemas[name] ? normalize(result, [schemas[name]]) : result;
                    return actionCreators.receiveData({ response: requestResponse, data })
                })
                .takeUntil(
                    action$.ofType(actionCreators.cancelRequest().toString())
                        .filter(cancelAction => cancelAction.payload.name == name)
                )
            );

        const deleteDataEpic = ( action$, store, { api, schemas } ) =>
            action$.ofType(actionCreators.deleteData().toString()).switchMap( action =>
                api(getRoute(url, routes.delete.route, action.payload).getFormattedUrl(), { method: 'delete' })
                    .concatMap(response => {
                        const result = get(response, resultPath.delete, null);
                        if(result.success) {
                            return Observable.of(
                                actionCreators.setMessage({ type: 'success', message: result.result }),
                                actionCreators.cancelRequest({ name }),
                                actionCreators.requestData({ query: get(store.getState(), statePath).query })
                            );
                        }

                        return actionCreators.setMessage({ type: 'danger', message: result.result })
                    })
            );

        return { setParamsEpic, fetchDataEpic, deleteDataEpic };
    }


    const reducer = createReducer(tableReducer, action => action.name === name);

    const actionCreator = createActionCreator(name, url, routes);
    const actionCreators =  {
        cancelRequest: actionCreator(actions.REQUEST_DATA_CANCEL),
        requestData: actionCreator(actions.REQUEST_DATA),
        receiveData: actionCreator(actions.RECEIVE_DATA),
        setPage: actionCreator(actions.SET_PAGE),
        setSort: actionCreator(actions.SET_SORT),
        setLimit: actionCreator(actions.SET_LIMIT),
        setFilter: actionCreator(actions.SET_FILTER),
        setSelection: actionCreator(actions.SET_SELECTION),
        deleteData: actionCreator(actions.DELETE_DATA),
        setMessage: actionCreator(actions.SET_MESSAGE)
    }

    const epics = tableEpics(name, url, routes, statePath, resultPath, actionCreators);

    return {
        FlutterTable,
        reducer,
        epics,
        actionCreators
    }
}
