import React from 'react';
import { Button } from '../styled-components';

const Print = ({
    config: {
        label = 'Print',
        styles = {}
    },
    setIsPrinting
}) => (
    <Button className="rdt-toolbar-button print" onClick={() => setIsPrinting(true)} styles={ styles }>
        { label }
    </Button>
);

Print.mapPropsToComponent = ({
    printing: [ _, setIsPrinting ]
}) => ({ setIsPrinting });

export default Print;
