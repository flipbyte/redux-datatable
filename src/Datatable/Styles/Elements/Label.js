import React from 'react';
import styled, { css } from 'styled-components';

const Label = styled.label `
    display: inline-block;
    margin-bottom: 0.5rem;

    ${({ flex, noWrap }) => css `
        ${flex && `display: flex`};
        ${noWrap && `white-space: nowrap`};
    `}
`

export default Label;
