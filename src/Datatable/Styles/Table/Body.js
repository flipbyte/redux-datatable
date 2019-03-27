import React from 'react';
import styled, { css } from 'styled-components';

const TableBody = styled.div `
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    ${props => props.height && css `
        height: ${props.height}
    `};
    overflow-y: scroll;
`

export const TableBodyInner = styled.div.attrs(({ width = '100%' }) => ({
    style: { width }
})) `
    position: relative;
    border-bottom: ${props => props.borderBottom || '1px solid #ddd'};
    ${props => props.height && css `
        height: ${props.height}
    `};
`

export default TableBody;
