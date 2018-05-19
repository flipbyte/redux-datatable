import React from 'react';
import PropTypes from "prop-types";
import { SEARCH_OPERATOR_BETWEEN } from '../Filter';

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

const Date = ({ name, filterer }) =>
    <td>
        <input
            className="form-control"
            type="date"
            name={ name }
            onChange={ (event) => _applyFilter(0, filterer, event) }
            placeholder="From" />
        <input
            className="form-control"
            type="date"
            name={ name }
            onChange={ (event) => _applyFilter(1, filterer, event) }
            placeholder="To" />
    </td>

Date.propTypes = {
    filterer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default Date;
