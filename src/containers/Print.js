import React, { useEffect } from 'react';
import PrintButton from '../styled-components/Print';
import withModal from '../hoc/withModal';
import { SET_IS_PRINTING } from '../actions';

const Print = ({ action, children, ...rest }) => {
    useEffect(() => {
        window.print();
        action(SET_IS_PRINTING)({ value: false })
    }, []);

    return <PrintButton { ...rest }>{ children }</PrintButton>;
};

export default withModal(Print);
