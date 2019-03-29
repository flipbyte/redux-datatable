import React from 'react';
import styled from 'styled-components';

export const ToolbarRow = styled.div `
    display: inline-block;
    width: 100%;
`

export const ToolbarItem = styled.div `
    display: block;
    width: ${props => props.width || 'auto'};
    float: ${props => props.right ? 'right' : 'left'};
    font-size: ${props => props.fontSize || '15px'};
`

const Toolbar = styled.div `
    display: block;
    width: 100%;
`

export default Toolbar;
