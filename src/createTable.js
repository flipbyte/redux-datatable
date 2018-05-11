import React, { Component } from 'react'
import PropTypes from "prop-types";

import 'rxjs';
import { Observable  } from 'rxjs/Observable';
// import { ajax } from 'rxjs/observable/dom/ajax';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_DATA_CANCEL = 'REQUEST_DATA_CANCEL';

export const requestData = ( name, query ) => ({ type: REQUEST_DATA, name })
export const receiveData = ( payload, name ) => ({ type: RECEIVE_DATA, name, payload })

export const fetchData = ( endpoint, query, name, ajax ) => action$ =>
    action$.ofType(REQUEST_DATA).mergeMap(action =>
        ajax.getJSON(`${endpoint}?${queryString.stringify(query)}`)
            .map(response => actions.receiveData(response))
            .takeUntil(action$.ofType(actions.REQUEST_DATA_CANCEL))
    );

let initialState = {
    title: "",
    data: [],
    query: {
        page: 1,
        limit: 10,
        offset: 0,
        count: 0,
        search: {}
    }
}

export const reducer = (state = initialState, action) => {
    let data = initialState;
    switch (action.type) {
        case 'REQUEST_DATA':
            data[action.name].isFetching = true;
            return Object.assign({}, state, data);
        case 'RECEIVE_DATA':
            data[action.name] = {
                isFetching: false,
                data: { action }
            }
            return Object.assign({}, state, data);
        default:
            return state;
    }
}

export const createReducer = (reducer, predicate) => (state, action) =>
    predicate(action) || state === undefined ? reducer(state, action) : state


export default ({ name, url, params, loadingMessage }) => Table => {
    class WrappedTable extends Component {
        // static propTypes = {
        //     name: PropTypes.string.isRequired,
        //     url: PropTypes.string.isRequired,
        //     params: PropTypes.object,
        //     query: PropTypes.object,
        //     requestData: PropTypes.func,
        //     data: PropTypes.array
        // }

        // static defaultProps = {
        //     query: {
        //         limit: 10,
        //         offset: ( /*page - 1*/ ( 1 - 1) * /*limit*/5 ),
        //         count: 56,
        //         page: 5
        //     }
        // }

        componentWillMount() {
            console.log(this.props);

            // const { requestContent, query } = this.props;
            // requestContent(1, query);

            // const { name, query } = this.props;
            // requestContent(name, query)
        }

        render() {
            return (
                <Table { ...this.props } />
            )
        }
    }

    WrappedTable.propTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        params: PropTypes.object,
        query: PropTypes.object,
        requestData: PropTypes.func,
        data: PropTypes.array
    };

    WrappedTable.defaultProps = {
        query: {
            limit: 10,
            offset: ( /*page - 1*/ ( 1 - 1) * /*limit*/5 ),
            count: 56,
            page: 5
        }
    };

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
