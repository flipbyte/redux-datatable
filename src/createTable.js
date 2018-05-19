import React, { Component } from 'react'

import { Observable  } from 'rxjs/Observable';
import { concatMap, switchMap, map, takeUntil, filter } from 'rxjs/operator';
import { of } from 'rxjs/observable/of';
import { denormalize, normalize } from 'normalizr';

import qs from 'qs';

import { getValueByPath } from './utils';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_DATA_CANCEL = 'REQUEST_DATA_CANCEL';

export const SET_PAGE = 'SET_PAGE';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_LIMIT = 'SET_LIMIT';

export const DELETE_DATA = 'DELETE_DATA';

export const createActionCreator = ( name, url ) => ( type ) => ( payload ) => {
    let action = ({ type: type, name, url, payload: payload });
    action.toString = () => type;

    return action;
}

const tableEpics = ( name, url, stateKeys, actionsCreators ) => {
    const setParamsEpic = ( action$, store ) =>
        action$.ofType(
            actionsCreators.setPage().toString(),
            actionsCreators.setFilter().toString(),
            actionsCreators.setLimit().toString(),
            actionsCreators.setSort().toString()
        ).concatMap( action =>
            Observable.of(
                actionsCreators.cancelRequest({ name }),
                actionsCreators.requestData({ query: getValueByPath(store.getState(), stateKeys).query })
            )
        );

    const fetchDataEpic = ( action$, store, { getJSONSecure, schemas } ) =>
        action$.ofType(actionsCreators.requestData().toString()).switchMap( action =>
            getJSONSecure(`${url}?${qs.stringify(action.payload.query)}`)
                .map(response => {
                    const data = normalize(response.data, [schemas[name]])
                    return actionsCreators.receiveData({ response, data })
                })
                .takeUntil(
                    action$.ofType(actionsCreators.cancelRequest().toString())
                        .filter(cancelAction => cancelAction.payload.name == name)
                )
        );

    return { setParamsEpic, fetchDataEpic };
}

// export const deleteDataEpic = ( action$, store, { getJSONSecure }) =>
//     action$.ofType(DELETE_DATA).switchMap( action =>
//         getJSONSecure(`${action.url}?{qs.stringify}`)
//     );


export const createReducer = (reducer, predicate) => (state, action) =>
    predicate(action) || state === undefined ? reducer(state, action) : state


export default ( props ) => Table => {
    const {
        name,
        url,
        config,
        limiterOptions,
        onLoadParams,
        stateKeys
    } = props;

    class WrappedTable extends Component {
        componentWillMount() {
            const { onLoad, query } = this.props;
            onLoad();
        }

        setValidPage(nextProps) {
            if(nextProps.query.count <= 0) {
                return true;
            }

            let totalEntries = parseInt(nextProps.query.count);
            let totalPages = Math.ceil(totalEntries / nextProps.query.limit);
            if(totalPages < this.props.query.page) {
                this.props.setPage(name, url, totalPages);
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
                    url={ url }
                    config={ config }
                    limiterOptions={ limiterOptions }
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
    }

    const tableReducer = (state = initialState, action) => {
        let data = initialState;
        const { ...payload } = action.payload;
        switch (action.type) {
            case REQUEST_DATA:
                data.isFetching = true;
                return Object.assign({}, state, data);

            case RECEIVE_DATA:
                data.isFetching = false;
                data.query.count = parseInt(payload.response.total);
                data.items = payload.data.result;
                return Object.assign({}, state, data);

            case SET_PAGE:
                data.query.page = payload.page;
                data.query.offset = ( (data.query.page - 1) * data.query.limit );
                data.query.offset = data.query.offset > 0 ? data.query.offset : 0;
                return Object.assign({}, state, data);

            case SET_SORT:
                data.query.sort = payload.sort;
                data.query.dir = payload.dir;
                return Object.assign({}, state, data);

            case SET_LIMIT:
                data.query.limit = parseInt(payload.limit);
                data.query.offset = ( (data.query.page - 1) * data.query.limit );
                return Object.assign({}, state, data);

            case SET_FILTER:
                data.query.search[payload.key] = payload.filter;
                return Object.assign({}, state, data);

            default:
                return state;
        }
    }


    const reducer = createReducer(tableReducer, action => action.name === name);

    const actionCreator = createActionCreator(name, url);
    const actionCreators =  {
        cancelRequest: actionCreator(REQUEST_DATA_CANCEL),
        requestData: actionCreator(REQUEST_DATA),
        receiveData: actionCreator(RECEIVE_DATA),
        setPage: actionCreator(SET_PAGE),
        setSort: actionCreator(SET_SORT),
        setLimit: actionCreator(SET_LIMIT),
        setFilter: actionCreator(SET_FILTER),
        deleteData: actionCreator(DELETE_DATA),
    }

    const epics = tableEpics(name, url, stateKeys, actionCreators);

    return {
        WrappedTable,
        reducer,
        epics,
        actionCreators
    }
}
