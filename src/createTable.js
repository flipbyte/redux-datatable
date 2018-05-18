import React, { Component } from 'react'

// import 'rxjs';
import { Observable  } from 'rxjs/Observable';
import { concatMap, switchMap, map, takeUntil, filter } from 'rxjs/operator';
import { of } from 'rxjs/observable/of';
import { denormalize, normalize } from 'normalizr';

// import 'rxjs/add/operator/mergeMap';
import qs from 'qs';
// import op from 'object-path';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_DATA_CANCEL = 'REQUEST_DATA_CANCEL';

export const SET_PAGE = 'SET_PAGE';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_LIMIT = 'SET_LIMIT';

export const DELETE_DATA = 'DELETE_DATA';

export const cancelRequest = ( name ) => ({ type: REQUEST_DATA_CANCEL, name })
export const requestData = ( name, url, query ) => ({ type: REQUEST_DATA, name, url, query })
export const receiveData = ( name, response, normalizedData ) => ({ type: RECEIVE_DATA, name, response, normalizedData })
export const setPage = ( name, url, page ) => ({ type: SET_PAGE, name, url, page })
export const setSort = ( name, url, sort, dir ) => ({ type: SET_SORT, name, url, sort, dir })
export const setLimit = ( name, url, limit ) => ({ type: SET_LIMIT, name, url, limit })
export const setFilter = ( name, url, key, filter ) => ({ type: SET_FILTER, name, url, key, filter })
export const deleteData = ( name, url, id ) => ({ type: DELETE_DATA, name, url, id})

// export const setParamsEpic = ( action$, store ) =>
//     action$.ofType(SET_PAGE, SET_FILTER, SET_LIMIT, SET_SORT).concatMap( action =>
//         Observable.of(cancelRequest(action.name), requestData(action.name, action.url, store.getState().content[action.name].query))
//     );

// const createActionCreator => ( { name, url, type } ) => ( payload ) => {
//     let action = ({ type: type, name, url, payload});
//     action.toString = () => type;
//
//     return action;
// }
//
//
// const actionCreators = ( name, url, payload ) => {
//     return {
//         cancelRequest: createActionCreator({ type: REQUEST_DATA_CANCEL, name, url }) (),
//         requestData: createActionCreator({ type: REQUEST_DATA, name, url })( payload ),
//         receiveData: createActionCreator({ type: RECEIVE_DATA, name, url, payload }),
//         setPage: createActionCreator({ type: SET_PAGE, name, url, payload }),
//         setSort: createActionCreator({ type: SET_SORT, name, url, payload }),
//         setLimit: createActionCreator({ type: SET_LIMIT, name, url, payload }),
//         setFilter: createActionCreator({ type: SET_FILTER, name, url, payload }),
//     }
// }


const tableEpics = ( name, url ) => {
    const setParamsEpic = ( action$, store ) =>
        action$.ofType(
            SET_PAGE, SET_FILTER, SET_LIMIT, SET_SORT
        ).concatMap( action =>
            Observable.of(
                cancelRequest(name),
                requestData(name, url, store.getState().content[name].query)
            )
        );

    const fetchDataEpic = ( action$, store, { getJSONSecure, schemas } ) =>
        action$.ofType(REQUEST_DATA).switchMap( action =>
            getJSONSecure(`${url}?${qs.stringify(action.query)}`)
                .map(response => {
                    const data = normalize(response.data, [schemas[name]])
                    return receiveData(name, response, data)
                })
                .takeUntil(
                    action$.ofType(REQUEST_DATA_CANCEL)
                        .filter(cancelAction => cancelAction.name == name)
                )
        );

    return { setParamsEpic, fetchDataEpic };
}
// export const fetchDataEpic = ( action$, store, { getJSONSecure, schemas }) =>
//     action$.ofType(REQUEST_DATA).switchMap( action =>
//         getJSONSecure(`${action.url}?${qs.stringify(action.query)}`)
//             .map(response => {
//                 const data = normalize(response.data.items, [schemas[action.name]])
//                 return receiveData(action.name, response, data)
//             })
//             .takeUntil(action$.ofType(REQUEST_DATA_CANCEL).filter(
//                 cancelAction => cancelAction.type == REQUEST_DATA_CANCEL && cancelAction.name == action.name))
//     );

// export const deleteDataEpic = ( action$, store, { getJSONSecure }) =>
//     action$.ofType(DELETE_DATA).switchMap( action =>
//         getJSONSecure(`${action.url}?{qs.stringify}`)
//     );

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


export const createReducer = (reducer, predicate) => (state, action) =>
    predicate(action) || state === undefined ? reducer(state, action) : state


export default ( props ) => Table => {
    const {
        name,
        url,
        config,
        limiterOptions,
        onLoadParams
    } = props;

    class WrappedTable extends Component {
        componentWillMount() {
            const { onLoad, query } = this.props;
            onLoad(name, url);
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

    const tableReducer = (state = initialState, action) => {
        let data = initialState;
        switch (action.type) {
            case REQUEST_DATA:
                data.isFetching = true;
                return Object.assign({}, state, data);

            case RECEIVE_DATA:
                data.isFetching = false;
                data.query.count = parseInt(action.response.total);
                data.items = action.normalizedData.result;
                return Object.assign({}, state, data);

            case SET_PAGE:
                data.query.page = action.page;
                data.query.offset = ( (data.query.page - 1) * data.query.limit );
                data.query.offset = data.query.offset > 0 ? data.query.offset : 0;
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
                data.query.search[action.key] = action.filter;
                return Object.assign({}, state, data);

            default:
                return state;
        }
    }


    const reducer = createReducer(tableReducer, action => action.name === name);
    const epics = tableEpics(name, url);
    const actionCreators =  {
        cancelRequest: cancelRequest,
        requestData: requestData,
        receiveData: receiveData,
        setPage: setPage,
        setSort: setSort,
        setLimit: setLimit,
        setFilter: setFilter,
        deleteData: deleteData,
    }

    return {
        WrappedTable,
        reducer,
        epics,
        actionCreators
    }
}
