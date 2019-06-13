import React from 'react';
import { SET_FILTER } from '../actions';
import { Button } from '../styled-components';

const ResetFilters = ({
    action,
    config: { label = 'Reset Filters' }
}) => {
    const clearFilter = () => action(SET_FILTER)({ clear: true });
    return (
        <Button className="rdt-toolbar-button reset-filters" onClick={ clearFilter.bind(this) }>
            { label }
        </Button>
    );
};

ResetFilters.mapPropsToComponent = ({ action }) => ({ action });

export default ResetFilters;
