import React, { Component } from 'react'
import PropTypes from "prop-types";

import 'rxjs';
import { Observable  } from 'rxjs/Observable';
import queryString from 'query-string';

// import { ajax } from 'rxjs/observable/dom/ajax';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_DATA_CANCEL = 'REQUEST_DATA_CANCEL';

export const SET_PAGE = 'SET_PAGE';
export const SET_FILTERS = 'SET_FILTERS';

export const requestData = ( name, query ) => ({ type: REQUEST_DATA, name, query })
export const receiveData = ( payload, name ) => ({ type: RECEIVE_DATA, name, payload })
export const setPage = ( name, page ) => ({ type: SET_PAGE, name, page })
export const setFilters = ( name, filters ) => ({ type: SET_FILTERS, name, filters })

// export const fetchDataEpic = ( endpoint, name, ajax ) => action$ =>
//     action$.ofType(REQUEST_DATA).mergeMap(action =>
//         ajax.getJSON(`${endpoint}?${queryString.stringify(query)}`)
//             .map(response => actions.receiveData(response))
//             .takeUntil(action$.ofType(actions.REQUEST_DATA_CANCEL))
//     );

export const fetchDataEpic = ( action$, { getJSONSecure }) =>
    action$.ofType({ REQUEST_DATA, SET_PAGE, SET_FILTERS }).mergeMap(action =>
        getJSONSecure(`${action.url}?${queryString.stringify(action.query)}`)
            .map(response => receiveData(response))
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
        search: {}
    }
}

export const data = (state = initialState, action) => {
    let data = initialState;
    switch (action.type) {
        case REQUEST_DATA:
            data.isFetching = true;
            return Object.assign({}, state, data);
        case RECEIVE_DATA:
            data = {
                isFetching: false,
                items: { action }
            }
            return Object.assign({}, state, data);
        case SET_PAGE:
            data.query.page = action.page;
            return Object.assign({}, state, data);
        case SET_FILTERS:
            data.query.search = action.filters;
            return Object.assign({}, state, data);
        default:
            return state;
    }
}

export const createReducer = (reducer, predicate) => (state, action) =>
    predicate(action) || state === undefined ? reducer(state, action) : state


export default ({ name, url, params, columns, loadingMessage }) => Table => {
    class WrappedTable extends Component {
        componentWillMount() {
            console.log(this.props);

            const { requestData, query } = this.props;
            requestData(name, query)
        }

        render() {
            return (
                <Table columns={ columns } { ...this.props } />
            )
        }
    }

    return WrappedTable
}



// src/components/Filters/FilterWrapper/index.js

// import React, {
//     Component
// } from‘ react’;
// import {
//     bindActionCreators
// } from‘ redux’;
// import {
//     connect
// } from‘ react - redux’;
//
// function FilterWrapper(ComposedFilter, filterInfo) {
//     class BaseFilter extends Component {
//         constructor() {
//             super();
//             this.state = {
//                 count: 0
//             };
//             this.onCheckboxChange = this.onCheckboxChange.bind(this);
//         }
//
//         onClick(e) {
//
//         }
//
//         onCheckboxChange(e) {
//
//         }
//
//         render() {
//             let countLabel = this.state.count > 0 ?
//                 < span > {
//                     this.state.count
//                 } < /span> :
//             null;
//
//             return ( < div className = ”filterDetailsWrapper” >
//                 < div className = ”filterTotalCount” > {
//                     countLabel
//                 } < /div> < div className = ”optionsDropDownContainer” >
//                 < ComposedFilter {…
//                     this.state
//                 } {…
//                     this.props
//                 }
//                 onCheckboxChange = {
//                     this.onCheckboxChange
//                 }
//                 /> < /div> < /div>
//             );
//         }
//     }
//
//     function mapStateToProps(state) {
//         // REDACTED
//         return {};
//     }
//
//     function mapDispatchToProps(dispatch) {
//         return {…
//             bindActionCreators(actions, dispatch)
//         };
//     }
//     return connect(mapStateToProps, mapDispatchToProps)(BaseFilter);
// }
//
// export default FilterWrapper;
