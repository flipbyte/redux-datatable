import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button `
    display: inline-block;
    transition: color 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
    vertical-align: middle;
    white-space: nowrap;

    ${({
        background = '#fff',
        border = '1px solid rgba(34,36,38,.15)',
        fontWeight = 400,
        lineHeight = 1.5,
        fontSize = '14px',
        borderRadius = 0,
        color = '#6c757d',
        padding = '0.375rem 0.75rem',
        dropdownToggle = false,
        hover = {},
        active,
        disabled = false,
    }) => css `
        background: ${background};
        border: ${border};
        font-weight: ${fontWeight};
        line-height: ${lineHeight};
        font-size: ${fontSize};
        border-radius: ${borderRadius};
        color: ${color};
        padding: ${padding};

        ${dropdownToggle && `
            &::after {
                display: inline-block;
                width: 0;
                height: 0;
                vertical-align: middle;
                content: '';
                border-top: 0.3em solid;
                border-right: 0.3rem solid transparent;
                border-bottom: 0;
                border-left: 0.3rem solid transparent;
                margin-left: 0.255rem;
            }
        `}

        ${!disabled && !active && css `
            cursor: pointer;

            &:hover {
                color: ${hover.color || '#fff'};
                background-color: ${hover.backgroundColor || '#5a6268'};
            }
        `}

        ${active && css `
            background: ${props => props.activeBackground || '#007bff'};
            color: ${props => props.activeColor || '#fff'};
            font-weight: ${props => props.activeFontWeight || 'normal'}
        `}

        ${disabled && css `
            opacity: 0.5;
        `}
    `}
`;

export default Button;
