import React from 'react';
import PropTypes from "prop-types";
import { SET_FILTER } from '../../actions';
import Styles from '../Styles';

const ResetFilters = ({ itemConfig, action }) => {
    const clearFilter = () => action(SET_FILTER)({ clear: true })
    return (
        <Styles.Elements.Button onClick={ clearFilter.bind(this) }>
            { itemConfig.label || 'Reset Filters' }
        </Styles.Elements.Button>
    )
};

export default ResetFilters;
