import React from 'react';
import styled from 'styled-components';

const Row = styled.div `
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
    padding: ${props => props.padding || 0};
    height: ${props => props.height || 'auto'};
`

export default Row;
