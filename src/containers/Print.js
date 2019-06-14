import React, { useEffect } from 'react';
import PrintButton from '../styled-components/Print';
import withModal from '../hoc/withModal';

const Print = ({ setIsPrinting, children, ...rest }) => {
    useEffect(() => {
        window.print();
        setIsPrinting(false);
    }, [])

    return <PrintButton { ...rest }>{ children }</PrintButton>;
}

export default withModal(Print);
