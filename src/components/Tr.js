import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';

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
    padding: 0;
    height: auto;
    position: relative;
    background: none;
    position: ${props => props.position || 'relative'};

`
const ExtendedStyledTr = styled(StyledTr)(getExtendedStyles())
export default ExtendedStyledTr;
