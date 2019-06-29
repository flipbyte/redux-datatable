import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';
import { withModal } from '../hoc';

const Print = styled.div `
    position: absolute;
    width: 100%;
    height: auto;
    background: #fff;
    top: 0;
    left: 0;
    z-index: 1
`;

const ExtendedPrint = styled(Print)(getExtendedStyles());
export default ExtendedPrint;
