import React, { useContext } from 'react';
import { SET_FILTER } from '../actions';
import { Button } from '../styled-components';
import ConfigContext from '../context';

const ResetFilters = ({
    config: {
        label = 'Reset Filters',
        styles = {}
    }
}) => {
    const { action } = useContext(ConfigContext);
    const clearFilter = () => action(SET_FILTER)({ clear: true });
    return (
        <Button className="rdt-toolbar-button reset-filters" onClick={ clearFilter.bind(this) } styles={ styles }>
            { label }
        </Button>
    );
};

// ResetFilters.mapPropsToComponent = ({ action }) => ({ action });

export default ResetFilters;
