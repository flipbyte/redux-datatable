import React from 'react';
import styled, { css } from 'styled-components';

const TableCell = styled.div.attrs(({ width: maxWidth }) => ({
    style: { maxWidth }
})) `
    flex-direction: column;
    justify-content: center;
    flex: 1;
    display: flex;
    padding: 10px 5px;
    text-align: ${props => props.textAlign || 'center'};
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    width: 100%;
    position: relative;
    overflow: hidden;
    font-size: ${props => props.fontSize || '14px'};

    ${props => props.header && css `
        font-weight: ${props => props.headerFontWeight || 'bold'};
        background: ${props => props.headerBackground || '#f9fafb'};
        border-bottom: ${props => props.headerBorderBottom || '1px solid rgba(34,36,38,.1)'};
    `}

    ${props => props.sortable && css `
        cursor: pointer;
    `}
`

export default TableCell;
