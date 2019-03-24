import React from 'react';
import styled, { css } from 'styled-components';

const SortCaret = styled.div `
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 0.3em;
    border: 0;
    content: "";

    ${props => props.dir === 'asc' && css `
        vertical-align: baseline;
        border-top: none;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #000000;
        border-left: 4px solid transparent;
    `}

    ${props => props.dir === 'desc' && css `
        vertical-align: super;
        border-top: 4px solid #000000;
        border-right: 4px solid transparent;
        border-bottom: none;
        border-left: 4px solid transparent;
    `}
`

export default SortCaret;
