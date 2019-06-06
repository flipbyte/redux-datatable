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
    focusBorderColor,
    modified
}) => css `
    display: block;
    width: 100%;
    font-weight: 400;
    line-height: 1.5;
    background-color: ${backgroundColor || '#fff'};
    background-clip: padding-box;
    border: ${border || '1px solid #ebebeb'};
    border-radius: ${borderRadius || 0};
    font-size: ${fontSize || '.875rem'};
    color: ${color || '#495057'};
    padding: ${padding || '.375rem .75rem'};

    &:focus {
        box-shadow: ${focusShadow || 'none'};
        border-color: ${focusBorderColor || '#80bdff'}
    };

    ${modified && css`
        border: 1px solid #007bff;
    `}
`;

const Input = styled.input `
    ${props => formControl(props)};
`;

const Select = styled.select `
    ${props => formControl(props)};
    width: ${props => props.width || '100%'};
`;

export default {
    Select,
    Input
};
