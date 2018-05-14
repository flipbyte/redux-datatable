import React from 'react';
import PropTypes from "prop-types";

const SEARCH_OPERATOR_CONTAINS = 'contains';
const SEARCH_OPERATOR_BETWEEN = 'between';
const SEARCH_OPERATOR_IS = 'is';
const SEARCH_OPERATOR_IN = 'in';
const SEARCH_OPERATOR_NOT_IN = 'not in';
const SEARCH_TYPE_DATE = 'date';

const _applyFilters = (tableName, url, filterer, event) => {
    let filter = {};
    if(event.target.value) {
        filter = {
            operator: SEARCH_OPERATOR_IS,
            field: event.target.name,
            value: event.target.value,
            logic: 'where',
        };
    }

    filterer(tableName, url, event.target.name, filter);
};

const Filter = ({ tableName, url, name, filterer }) =>
    <td><input name={ name } onChange={ (event) => _applyFilters(tableName, url, filterer, event) } /></td>;

Filter.propTypes = {
    tableName: PropTypes.string.isRequired,
    url: PropTypes.string,
    filterer: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

Filter.defaultProps = {
    type: "string"
};

export default Filter;
