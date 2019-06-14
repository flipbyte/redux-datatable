import React from 'react';
import styled, { keyframes } from 'styled-components';
import { getExtendedStyles } from '../utils';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div `
    border: 5px solid #f3f3f3;
    border-top: 5px solid #000;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${rotate} 2s linear infinite;
    z-index: 2;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    position: absolute;
`;

const ExtendedSpinner = styled(Spinner)(getExtendedStyles('spinner'));
const Overlay = ({ className, ...props }) => (
    <div className={ className }>
        <ExtendedSpinner { ...props } />
    </div>
);

const Mask = styled(Overlay) `
    position: absolute;
    width: 100%;
    /* height: 100%; */
    height: inherit;
    opacity: 0.6;
    background: #fff;
    z-index: 1;
`;

const ExtendedMask = styled(Mask)(getExtendedStyles('mask'));
export default ExtendedMask;
