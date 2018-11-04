import React from 'react';
import PropTypes from "prop-types";
import Date from './Filter/Date';
import String from './Filter/String';
import Number from './Filter/Number';

import { connect } from 'react-redux';
import { setFilter } from '../actions';
import { prepareActionPayload } from '../utils'
import { withTableConfig } from '../TableProvider';

export const SEARCH_OPERATOR_IS = 'is';
export const SEARCH_OPERATOR_IN = 'in';
export const SEARCH_TYPE_DATE = 'date';
export const SEARCH_OPERATOR_NOT_IN = 'not in';
export const SEARCH_OPERATOR_BETWEEN = 'between';
export const SEARCH_OPERATOR_CONTAINS = 'contains';

const Filter = ( props ) => {
    if( props.type == 'number') return <Number { ...props } />
    if( props.type == 'string') return <String { ...props } />
    if( props.type == 'date') return <Date { ...props } />
    return <String { ...props } />
}

const mapDispatchToProps = ( dispatch, { config } ) => ({
    filterer: ( key, filter ) => dispatch(setFilter(prepareActionPayload(config)({ key, filter }))),
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    routes: 'routes',
    entity: 'entity'
})(connect(null, mapDispatchToProps)(Filter));
