import React from 'react';
import styled, { css } from 'styled-components';

const TableCell = styled.div `
    float: left;
    padding: 10px 5px;
    overflow: hidden;
    text-align: ${props => props.textAlign || 'center'};
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    width: ${props => props.width || '0px'};
    font-size: ${props => props.fontSize || '14px'};

    ${props => props.header && css `
        font-weight: ${props => props.headerFontWeight || 'bold'};
        background: ${props => props.headerBackground || '#f9fafb'};
        border-bottom: ${props => props.headerBorderBottom || '1px solid rgba(34,36,38,.1)'};
    `}

    ${props => props.sortable && css `
        cursor: pointer;
    `}

    ${props => props.search && css `
        & input {
            border-radius: ${props => props.inputRadius || 0};
            color: ${props => props.inputColor || '#495057'};
            border: ${props => props.inputBorder || '1px solid #ebebeb'};
            padding: ${props => props.inputPadding || '10px 14px'};
            width: ${props => props.inputWidth || '100%'};

            &:focus {
                box-shadow: ${props => props.inputFocusShadow || 'none'};
                border-color: ${props => props.inputFocusBorderColor || '#80bdff'}
            }
        }
    `}
`

export default TableCell;
