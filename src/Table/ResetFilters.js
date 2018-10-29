import React from 'react';
import get from 'lodash/get';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { clearFilter } from '../actions';
import { prepareActionPayload } from '../utils'
import { withTableConfig } from '../TableProvider';

const ResetFilters = ({ clearFilter }) =>
    <button
        type="button"
        className="btn btn-primary"
        onClick={ clearFilter.bind(this) }>
        Reset Filters
    </button>

const mapDispatchToProps = ( dispatch, { config } ) => ({
    clearFilter: ( ) => dispatch(clearFilter(prepareActionPayload(config)()))
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    routes: 'routes'
})(connect(null, mapDispatchToProps)(ResetFilters));
