import React from 'react';
import styled, { css } from 'styled-components';

const Tr = ({ className, children, style, columns }) => (
    <div className={ className } style={ style }>
        { columns.map((column, index) => (
            children(column, index)
        )) }
    </div>
);

const StyledTr = styled(Tr).attrs(({ top }) => ({
    style: { top }
})) `
    display: flex;
    width: 100%;
    padding: ${props => props.padding || 0};
    height: ${props => props.height || 'auto'};
    position: ${props => props.position || 'relative'};
    background: ${props => props.background || 'none'};

    ${props => props.even && css `
        background: ${props.evenBackground || 'none'};
    `}
`


export default StyledTr;
