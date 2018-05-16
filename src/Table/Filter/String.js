import React from 'react';
import PropTypes from "prop-types";
import { SEARCH_OPERATOR_CONTAINS } from '../Filter';

const _applyFilter = (tableName, url, filterer, event) => {
    let filter = {};
    if(event.target.value) {
        filter = {
            operator: SEARCH_OPERATOR_CONTAINS,
            field: event.target.name,
            value: event.target.value,
            logic: 'where',
        };
    }

    filterer(tableName, url, event.target.name, filter);
};

const String = ({ tableName, url, name, filterer }) =>
    <td>
        <input
            className="form-control"
            name={ name }
            onChange={ (event) => _applyFilter(tableName, url, filterer, event) } />
    </td>

String.propTypes = {
    tableName: PropTypes.string.isRequired,
    url: PropTypes.string,
    filterer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default String;
