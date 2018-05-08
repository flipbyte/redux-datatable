import React from 'react';
import PropTypes from "prop-types";

const Filter = ( props ) =>
    <td><input name={ props.name } /></td>;

Filter.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

Filter.defaultProps = {
    type: "string"
};

export default Filter;
