import React, { useContext } from 'react';
import { SET_FILTER } from '../actions';
import { Button } from '../styled-components';
import ConfigContext from '../context';

const ResetFilters = ({
    config: {
        label = 'Reset Filters',
        styles = {},
        className = 'rdt-toolbar-button reset-filters'
    }
}) => {
    const { action } = useContext(ConfigContext);
    const clearFilter = () => action(SET_FILTER)({ clear: true });
    return (
        <Button className={ className } onClick={ clearFilter.bind(this) } styles={ styles }>
            { label }
        </Button>
    );
};

export default ResetFilters;
