import React, { useContext } from 'react';
import { Button } from '../styled-components';
import ConfigContext from '../context';

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

// Print.mapPropsToComponent = ({
//     printing: [ _, setIsPrinting ]
// }) => ({ setIsPrinting });
//
export default Print;
