import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';

const Container = styled.div `
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    font-size: 14px;
    clear: both;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
        sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

const ExtendedContainer = styled(Container)(getExtendedStyles());
export default ExtendedContainer;
