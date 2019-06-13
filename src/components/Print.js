import React from 'react';
import { Button } from '../styled-components';

const Print = ({
    config: { label = 'Print' },
    setIsPrinting
}) => (
    <Button className="rdt-toolbar-button print" onClick={() => setIsPrinting(true)}>
        { label }
    </Button>
);

Print.mapPropsToComponent = ({
    printing: [ _, setIsPrinting ]
}) => ({ setIsPrinting });

export default Print;
