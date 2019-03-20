import React from 'react';
import PropTypes from "prop-types";
import { Button } from 'styled-button-component';
import { SET_FILTER } from '../../actions';

const ResetFilters = ({ itemConfig, action }) => {
    const clearFilter = () => action(SET_FILTER)({ clear: true })
    return (
        <Button default noRadius onClick={ clearFilter.bind(this) }>
            { itemConfig.label || 'Reset Filters' }
        </Button>
    )
};

export default ResetFilters;
