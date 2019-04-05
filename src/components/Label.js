import React from 'react';
import styled, { css } from 'styled-components';

const Label = styled.label `
    display: inline-block;
    line-height: 2.5;
    ${({ flex, noWrap }) => css `
        ${flex && `display: flex`};
        ${noWrap && `white-space: nowrap`};
    `}
`

export default Label;
