import React from 'react';
import PropTypes from "prop-types";
import String from './Filter/String';
import Number from './Filter/Number';
import Date from './Filter/Date';

export const SEARCH_OPERATOR_CONTAINS = 'contains';
export const SEARCH_OPERATOR_BETWEEN = 'between';
export const SEARCH_OPERATOR_IS = 'is';
export const SEARCH_OPERATOR_IN = 'in';
export const SEARCH_OPERATOR_NOT_IN = 'not in';
export const SEARCH_TYPE_DATE = 'date';

const Filter = ( props ) => {
    if( props.type == 'number') return <Number { ...props } />
    if( props.type == 'string') return <String { ...props } />
    if( props.type == 'date') return <Date { ...props } />
    return <String { ...props } />
}

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
