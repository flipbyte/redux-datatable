import React, { Component } from 'react'

// import 'rxjs';
import { Observable  } from 'rxjs/Observable';
import { mergeMap, map, takeUntil } from 'rxjs/operator/mergeMap';
import { of } from 'rxjs/observable/of';
// import 'rxjs/add/operator/mergeMap';
import qs from 'qs';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_DATA_CANCEL = 'REQUEST_DATA_CANCEL';

export const SET_PAGE = 'SET_PAGE';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_LIMIT = 'SET_LIMIT';

export const requestData = ( name, url, query ) => ({ type: REQUEST_DATA, name, url, query })
export const receiveData = ( name, payload ) => ({ type: RECEIVE_DATA, name, payload })
export const setPage = ( name, url, page ) => ({ type: SET_PAGE, name, url, page })
export const setSort = ( name, url, sort, dir ) => ({ type: SET_SORT, name, url, sort, dir })
export const setLimit = ( name, url, limit ) => ({ type: SET_LIMIT, name, url, limit })
export const setFilter = ( name, url, key, filter ) => ({ type: SET_FILTER, name, url, key, filter })

export const setParamsEpic = ( action$, store ) =>
    action$.ofType(SET_PAGE, SET_FILTER, SET_LIMIT, SET_SORT).mergeMap( action =>
        Observable.of(requestData(action.name, action.url, store.getState()[action.name].query))
    );

export const fetchDataEpic = ( action$, store, { getJSONSecure }) =>
    action$.ofType(REQUEST_DATA).mergeMap(action =>
        getJSONSecure(`${action.url}?${qs.stringify(action.query)}`)
            .map(response => receiveData(action.name, response))
            .takeUntil(action$.ofType(REQUEST_DATA_CANCEL))
    );


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

export const data = (state = initialState, action) => {
    let data = initialState;
    switch (action.type) {
        case REQUEST_DATA:
            data.isFetching = true;
            return Object.assign({}, state, data);
        case RECEIVE_DATA:
            data.isFetching = false;
            data.items = action.payload.data.items;
            data.query.count = parseInt(action.payload.data.total);
            return Object.assign({}, state, data);
        case SET_PAGE:
            data.query.page = action.page;
            data.query.offset = ( (data.query.page - 1) * data.query.limit );
            return Object.assign({}, state, data);
        case SET_SORT:
            data.query.sort = action.sort;
            data.query.dir = action.dir;
            return Object.assign({}, state, data);
        case SET_LIMIT:
            data.query.limit = parseInt(action.limit);
            data.query.offset = ( (data.query.page - 1) * data.query.limit );
            return Object.assign({}, state, data);
        case SET_FILTER:
            // data.search = action.filters;
            data.query.search[action.key] = action.filter;
            return Object.assign({}, state, data);
        default:
            return state;
    }
}

export const createReducer = (reducer, predicate) => (state, action) =>
    predicate(action) || state === undefined ? reducer(state, action) : state


export default ({ name, url, columns, limiterOptions, onLoadParams }) => Table => {
    class WrappedTable extends Component {
        componentWillMount() {
            const { onLoad, query } = this.props;
            onLoad(name, url, onLoadParams);
        }

        render() {
            return (
                <Table name={ name }
                    url={ url }
                    columns={ columns }
                    limiterOptions={ limiterOptions }
                    { ...this.props } />
            )
        }
    }

    return WrappedTable
}
