import React from 'react';
import PropTypes from "prop-types";
import { SEARCH_OPERATOR_BETWEEN } from '../Filter';

var dateFrom = null;
var dateTo = null;

const _applyFilter = (key, tableName, url, filterer, event) => {
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

    filterer(tableName, url, event.target.name, filter);
};

const Date = ({ tableName, url, name, filterer }) =>
    <td>
        <input
            className="form-control"
            type="date"
            name={ name }
            onChange={ (event) => _applyFilter(0, tableName, url, filterer, event) }
            placeholder="From" />
        <input
            className="form-control"
            type="date"
            name={ name }
            onChange={ (event) => _applyFilter(1, tableName, url, filterer, event) }
            placeholder="To" />
    </td>

Date.propTypes = {
    tableName: PropTypes.string.isRequired,
    url: PropTypes.string,
    filterer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default Date;
