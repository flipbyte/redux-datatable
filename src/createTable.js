import React, { Component } from 'react'

import { Observable  } from 'rxjs/Observable';
import { concatMap, switchMap, map, takeUntil, filter } from 'rxjs/operator';
import { of } from 'rxjs/observable/of';
import { denormalize, normalize } from 'normalizr';

import qs from 'qs';

import { getValueByPath, createActionCreator, createReducer } from './utils';
import * as actions from './actions';

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
            case actions.REQUEST_DATA:
                data.isFetching = true;
                return Object.assign({}, state, data);

            case actions.RECEIVE_DATA:
                data.isFetching = false;
                data.query.count = parseInt(payload.response.total);
                data.items = payload.data.result;
                return Object.assign({}, state, data);

            case actions.SET_PAGE:
                data.query.page = payload.page;
                data.query.offset = ( (data.query.page - 1) * data.query.limit );
                data.query.offset = data.query.offset > 0 ? data.query.offset : 0;
                return Object.assign({}, state, data);

            case actions.SET_SORT:
                data.query.sort = payload.sort;
                data.query.dir = payload.dir;
                return Object.assign({}, state, data);

            case actions.SET_LIMIT:
                data.query.limit = parseInt(payload.limit);
                data.query.offset = ( (data.query.page - 1) * data.query.limit );
                return Object.assign({}, state, data);

            case actions.SET_FILTER:
                data.query.search[payload.key] = payload.filter;
                return Object.assign({}, state, data);

            default:
                return state;
        }
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


    const reducer = createReducer(tableReducer, action => action.name === name);

    const actionCreator = createActionCreator(name, url);
    const actionCreators =  {
        cancelRequest: actionCreator(actions.REQUEST_DATA_CANCEL),
        requestData: actionCreator(actions.REQUEST_DATA),
        receiveData: actionCreator(actions.RECEIVE_DATA),
        setPage: actionCreator(actions.SET_PAGE),
        setSort: actionCreator(actions.SET_SORT),
        setLimit: actionCreator(actions.SET_LIMIT),
        setFilter: actionCreator(actions.SET_FILTER),
        deleteData: actionCreator(actions.DELETE_DATA),
    }

    const epics = tableEpics(name, url, stateKeys, actionCreators);

    return {
        WrappedTable,
        reducer,
        epics,
        actionCreators
    }
}
