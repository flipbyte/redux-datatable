import React, { useContext } from 'react';
import { Button } from '../styled-components';
import ConfigContext from '../context';
import { SET_IS_PRINTING } from '../actions';

const Print = ({
    config: {
        label = 'Print',
        styles = {},
        className = 'rdt-toolbar-btn print'
    }
}) => {
    const { action } = useContext(ConfigContext);
    return (
        <Button
            className={ className }
            onClick={() => action(SET_IS_PRINTING)({ value: true })}
            styles={ styles }
        >
            { label }
        </Button>
    );
};

export default Print;
