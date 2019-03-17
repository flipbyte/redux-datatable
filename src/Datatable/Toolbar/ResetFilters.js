import React from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { setFilter } from '../../actions';
import { prepareActionPayload } from '../../utils'
import { withTableConfig } from '../../TableProvider';
import { Button } from 'styled-button-component';

const ResetFilters = ({ itemConfig, clearFilter }) =>
    <Button default noRadius onClick={ clearFilter.bind(this) }>
        { _.get(itemConfig, 'label', 'Reset Filters') }
    </Button>

const mapDispatchToProps = ( dispatch, { config } ) => ({
    clearFilter: ( ) => dispatch(setFilter(prepareActionPayload(config)({ clear: true })))
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    routes: 'routes',
    entity: 'entity',
})(connect(null, mapDispatchToProps)(ResetFilters));
