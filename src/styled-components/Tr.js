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

const StyledTr = styled(Tr).attrs(({ top, left }) => ({
    style: { top, left }
})) `
    display: flex;
    width: auto;
    padding: 0;
    height: ${props => props.height ? `${props.height}px` : 'auto'};
    position: relative;
    background: none;
    position: ${props => props.position || 'relative'};
`;
const ExtendedStyledTr = styled(StyledTr)(getExtendedStyles());
export default React.memo(ExtendedStyledTr);
