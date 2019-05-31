import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getExtendedStyles, withModal } from '../utils';
import { SET_IS_PRINTING } from '../constants';

const StyledPrint = styled.div `
    position: absolute;
    width: 100%;
    height: auto;
    background: #fff;
    top: 0;
    left: 0;
    z-index: 1
`;
const ExtendedStyledPrint = styled(StyledPrint)(getExtendedStyles());

const Print = ({ children, internalStateUpdater, ...rest }) => {
    useEffect(() => {
        window.print();
        internalStateUpdater({ type: SET_IS_PRINTING, value: false })
    }, [])

    return <ExtendedStyledPrint { ...rest }>{ children }</ExtendedStyledPrint>;
}

export default withModal(Print);
