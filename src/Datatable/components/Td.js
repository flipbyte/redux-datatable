import React from 'react';
import styled from 'styled-components';

const Td = styled.div.attrs(({ width: maxWidth }) => ({
    style: { maxWidth }
})) `
    flex-direction: column;
    justify-content: center;
    flex: 1;
    display: flex;
    padding: 10px 5px;
    text-align: ${props => props.textAlign || 'center'};
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    width: 100%;
    position: relative;
    overflow: hidden;
    font-size: ${props => props.fontSize || '14px'};
`

export default Td;
