import React from 'react';
import PropTypes from "prop-types";

const Cell = ({ isHeader, label, attributes }) =>
    ( isHeader ) ?
        <th { ...attributes }>{ label }</th> :
        <td { ...attributes }>{ label }</td> ;

Cell.propTypes = {
    isHeader: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    attributes: PropTypes.object
};

Cell.defaultProps = {
    isHeader: false,
    attributes: {}
};

export default Cell;
