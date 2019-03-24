import React from 'react';
import styled, { css } from 'styled-components';

const Row = styled.div.attrs(({ top }) => ({
    style: { top }
})) `
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
    padding: ${props => props.padding || 0};
    height: ${props => props.height || 'auto'};
    position: ${props => props.position || 'relative'};
`

export default Row;
