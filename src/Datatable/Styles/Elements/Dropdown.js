import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div `
    position: relative;
`

export const Menu = styled.div `
    position: absolute;
    top: 100%;
    z-index: 1000;
    float: left;
    min-width: 10rem;
    text-align: left;
    list-style: none;
    background-clip: padding-box;

    ${({
        padding = '0.375rem 0.75rem',
        margin,
        fontSize = '14px',
        color = '#6c757d',
        border = '1px solid #6c757d',
        right = false,
        backgroundColor = '#fff',
        borderRadius,
        hidden
    }) => css `
        padding: ${padding};
        margin: ${margin};
        font-size: ${fontSize};
        color: ${color};
        background-color: ${backgroundColor};
        border: ${border};
        border-radius: ${borderRadius};
        ${hidden
            ? `display: none`
            : `display: block`
        }
        ${right
            ? `right: 0`
            : `left: 0`
        }
    `}
`;

export const Item = styled.div `
    clear: both;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;

    ${({
        padding = '0.375rem 0.75rem',
        color,
        fontWeight,
        hover,
        isActive,
        active,
        isDisabled,
        disabled
    }) => css `
        padding: ${padding};
        color: ${color};
        font-weight: ${fontWeight};

        ${hover && `
            &:hover, &:focus {
                color: ${hover.color};
                text-decoration: none;
                background-color: ${hover.backgroundColor};
            }
        `}

        ${isActive && active && `
            text-decoration: none;
            color: ${active.color};
            background-color: ${active.backgroundColor};
        `}

        ${isDisabled && disabled && `
            color: ${disabled.color};
            background-color: transparent;
        `}
    `}
`;


export default {
    Container,
    Menu,
    Item
};
