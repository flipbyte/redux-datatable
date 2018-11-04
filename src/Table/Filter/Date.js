import React from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';
import { connect } from 'react-redux';
import { SEARCH_OPERATOR_BETWEEN } from '../Filter';
import { withTableConfig } from '../../TableProvider';

var dateFrom = null;
var dateTo = null;

const _applyFilter = (key, filterer, event) => {
    let filter = {};

    if(key == 0) {
        dateFrom = event.target.value;
    } else {
        dateTo = event.target.value;
    }

    if( dateFrom || dateTo ) {
        filter = {
            operator: SEARCH_OPERATOR_BETWEEN,
            field: event.target.name,
            value: [ dateFrom, dateTo ],
            logic: 'where',
            type: 'date',
        };
    }

    filterer(event.target.name, filter);
};

const Date = ({ colName, value, filterer }) =>
    <td>
        <input
            className="form-control"
            type="date"
            name={ colName }
            value={ value[0] ? value[0] : '' }
            onChange={ (event) => _applyFilter(0, filterer, event) }
            placeholder="From" />
        <input
            className="form-control"
            type="date"
            name={ colName }
            value={ value[1] ? value[1] : ''}
            onChange={ (event) => _applyFilter(1, filterer, event) }
            placeholder="To" />
    </td>


// import React, { Component } from 'react';
//
// const WAIT_INTERVAL = 1000;
// const ENTER_KEY = 13;
//
// class Date extends Component {
//     constructor(props) {
//         super();
//     }
//
//     componentWillMount() {
//         this.timer = null;
//     }
//
//     applyFilter(key, event) {
//         console.log(key);
//         console.log(event);
//         const { filterer } = this.props;
//
//         let filter = {};
//
//         if(key == 0) {
//             dateFrom = event.target.value;
//         } else {
//             dateTo = event.target.value;
//         }
//
//         if( dateFrom || dateTo ) {
//             filter = {
//                 operator: SEARCH_OPERATOR_BETWEEN,
//                 field: event.target.name,
//                 value: [ dateFrom, dateTo ],
//                 logic: 'where',
//                 type: 'date',
//             };
//         }
//
//         filterer(event.target.name, filter);
//     }
//
//     handleChange(value) {
//         clearTimeout(this.timer);
//         this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
//     }
//
//     handleKeyDown(e) {
//         if (e.keyCode === ENTER_KEY) {
//             this.triggerChange();
//         }
//     }
//
//     triggerChange() {
//         this.props.onChange(this.props.value);
//     }
//
//     render() {
//         const { colName, value } = this.props;
//
//         return (
//             <td>
//                 <input
//                     className="form-control"
//                     type="date"
//                     name={ colName }
//                     value={ value[0] ? value[0] : '' }
//                     onChange={ (event) => this.applyFilter.bind(this, 0) }
//                     placeholder="From" />
//                 <input
//                     className="form-control"
//                     type="date"
//                     name={ colName }
//                     value={ value[1] ? value[1] : ''}
//                     onChange={ (event) => this.applyFilter.bind(this, 1) }
//                     placeholder="To" />
//             </td>
//         );
//     }
// }

Date.propTypes = {
    filterer: PropTypes.func.isRequired,
    colName: PropTypes.string.isRequired
};

const mapStateToProps = ( state, { config: { reducerName, name }, colName } ) => ({
    value: get(state, [reducerName, name, 'query', 'search', colName, 'value'], [])
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
})(connect(mapStateToProps)(Date));
