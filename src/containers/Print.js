import _ from 'lodash';
import React, { useEffect, useContext } from 'react';
import { SET_IS_PRINTING } from '../constants';
import PrintButton from '../styled-components/Print';
import TableContext from '../'

const Print = ({ children, ...rest }) => {
    const context = useContext()
    const [ _, setIsPriting ] = use

    useEffect(() => {
        window.print();
        setIsPriting(false)
    }, [])

    return <PrintButton { ...rest }>{ children }</PrintButton>;
}

export default _.flowRight(Print);
