import React from 'react';
import { SET_FILTER } from '../../actions';
import Button from '../../components/Button';

const ResetFilters = ({ itemConfig, action }) => {
    const clearFilter = () => action(SET_FILTER)({ clear: true });
    return (
        <Button className="rdt-toolbar-button reset-filters" onClick={ clearFilter.bind(this) }>
            { itemConfig.label || 'Reset Filters' }
        </Button>
    );
};

export default ResetFilters;
