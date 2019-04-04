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
        padding = '0.5rem 0',
        margin = '0.125rem 0 0',
        fontSize = '14px',
        color = '#6c757d',
        border = '1px solid #ebebeb',
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
    cursor: pointer;

    ${({
        padding = '0.5rem 1.5rem',
        color = '#6c757d',
        fontWeight,
        hover = {},
        isActive,
        active,
        isDisabled,
        disabled
    }) => css `
        padding: ${padding};
        color: ${color};
        font-weight: ${fontWeight};

        &:hover, &:focus {
            color: ${hover.color || '#16181b'};
            text-decoration: none;
            background-color: ${hover.backgroundColor || '#f8f9fa'};
        }

        ${isActive && active && `
            text-decoration: none;
            color: ${active.color || '#fff'};
            background-color: ${active.backgroundColor || '#007bff'};
        `}

        ${isDisabled && disabled && `
            color: ${disabled.color || '#6c757d'};
            background-color: transparent;
        `}
    `}
`;


export default {
    Container,
    Menu,
    Item
};
