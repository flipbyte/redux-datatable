import React from 'react';
import styled, { css } from 'styled-components';

const formControl = ({
    backgroundColor,
    border,
    borderRadius,
    fontSize,
    color,
    padding,
    focusShadow,
    focusBorderColor
}) => css `
    display: block;
    width: 100%;
    font-weight: 400;
    line-height: 1.5;
    background-color: ${backgroundColor || '#fff'};
    background-clip: padding-box;
    border: ${border || '1px solid #ebebeb'};
    border-radius: ${borderRadius || 0};
    font-size: ${fontSize || '14px'};
    color: ${color || '#495057'};
    padding: ${padding || '10px 14px'};

    &:focus {
        box-shadow: ${focusShadow || 'none'};
        border-color: ${focusBorderColor || '#80bdff'}
    }
`

const Input = styled.input `
    ${props => formControl(props)}
`

const Select = styled.select `
    ${props => formControl(props)}
    width: ${props => props.width || '100%'};
`

const Label = styled.label `
    display: inline-block;
    margin-bottom: 0.5rem;

    ${({ flex, noWrap}) => css `
        ${flex && `display: flex`};
        ${noWrap && `white-space: nowrap`};
    `}
`

export default {
    Input,
    Select,
    Label
};
