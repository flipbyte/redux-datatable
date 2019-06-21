import React, { useContext } from 'react';
import { Button } from '../styled-components';
import ConfigContext from '../context';
import { SET_IS_PRINTING } from '../actions';

const Print = ({
    config: {
        label = 'Print',
        styles = {}
    }
}) => {
    const { action } = useContext(ConfigContext);
    return (
        <Button
            className="rdt-toolbar-button print"
            onClick={() => action(SET_IS_PRINTING)({ value: true })}
            styles={ styles }
        >
            { label }
        </Button>
    );
};

export default Print;
