import React from 'react';
import PropTypes from "prop-types";

const _applyFilters = (tableName, url, event) => {
    filterer(tableName, url, event.target.name, event.target.value);
};

const Filter = ({ tableName, url, name, filterer }) =>
    <td><input name={ name } onChange={ (event) => _applyFilters(tableName, url, event) } /></td>;

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
