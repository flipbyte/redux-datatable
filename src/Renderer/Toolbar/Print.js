import React from 'react';
import { SET_IS_PRINTING } from '../../constants';
import Button from '../../components/Button';

const Print = ({ itemConfig, internalStateUpdater }) => {
    const printTable = () => internalStateUpdater({ type: SET_IS_PRINTING, value: true });
    return (
        <Button onClick={ printTable.bind(this) }>
            { itemConfig.label || 'Print' }
        </Button>
    );
};

export default Print;
