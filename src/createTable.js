import React, { Component } from 'react'
import PropTypes from "prop-types";

// import 'rxjs';
import { Observable  } from 'rxjs/Observable';
import { mergeMap, map, takeUntil } from 'rxjs/operator/mergeMap';
import { of } from 'rxjs/observable/of';
// import 'rxjs/add/operator/mergeMap';
import queryString from 'query-string';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_DATA_CANCEL = 'REQUEST_DATA_CANCEL';

export const SET_PAGE = 'SET_PAGE';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_LIMIT = 'SET_LIMIT';

export const requestData = ( name, url, query ) => ({ type: REQUEST_DATA, name, url, query })
export const receiveData = ( name, payload ) => ({ type: RECEIVE_DATA, name, payload })
export const setPage = ( name, url, page ) => ({ type: SET_PAGE, name, url, page })
export const setLimit = ( name, url, limit ) => ({ type: SET_LIMIT, name, url, limit })
export const setFilters = ( name, url, filters ) => ({ type: SET_FILTERS, name, url, filters })

export const setParamsEpic = ( action$, store ) =>
    action$.ofType(SET_PAGE, SET_FILTERS, SET_LIMIT).mergeMap( action =>
        Observable.of(requestData(action.name, action.url, store.getState()[action.name].query))
    );

export const fetchDataEpic = ( action$, store, { getJSONSecure }) =>
    action$.ofType(REQUEST_DATA).mergeMap(action =>
        getJSONSecure(`${action.url}?${queryString.stringify(action.query)}`)
            .map(response => receiveData(action.name, response))
            .takeUntil(action$.ofType(REQUEST_DATA_CANCEL))
    );


let initialState = {
    isFetching: false,
    title: "",
    items: [],
    query: {
        page: 0,
        limit: 10,
        offset: 0,
        count: 0,
    },
    search: {}
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
        case SET_LIMIT:
            data.query.limit = parseInt(action.limit);
            data.query.offset = ( (data.query.page - 1) * data.query.limit );
            return Object.assign({}, state, data);
        case SET_FILTERS:
            data.search = action.filters;
            return Object.assign({}, state, data);
        default:
            return state;
    }
}

export const createReducer = (reducer, predicate) => (state, action) =>
    predicate(action) || state === undefined ? reducer(state, action) : state


export default ({ name, url, params, columns, limiterOptions, loadingMessage }) => Table => {
    class WrappedTable extends Component {
        componentWillMount() {
            console.log(this.props);

            const { setPage, query } = this.props;
            setPage(name, url, 1)
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
