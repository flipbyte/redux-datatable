import React from 'react';
import styled, { css } from 'styled-components';

const SortCaret = styled.span `
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 0.3em;
    border: 0;
    content: "";
    vertical-align: top;
    font-weight: normal;
    font-size: 10px;
    margin-top: 3px

    ${props => props.show && props.dir === 'asc' && css `
        &::before {
            content: ' \\2191';
        }

        &::after {
            content: '\\2193';
            color: #aaa;
        }
    `};

    ${props => props.show && props.dir === 'desc' && css `
        &::before {
            content: ' \\2191';
            color: #aaa;
        }

        &::after {
            content: '\\2193';
        }
    `};

    ${props => props.show === false && css`
        &::before {
            content: ' \\2191 \\2193';
            padding-right: 8px;
            color: #000
        }
    `}
`;

export default SortCaret;
