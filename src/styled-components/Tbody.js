import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';
import { Loader } from '../components';

const Tbody = React.forwardRef(({
    range: [ startIndex, endIndex ],
    className,
    style,
    width,
    children,
    rowHeight,
    innerHeight
}, ref) => (
    <div className={ className } style={ style } ref={ ref }>
        <Loader />
        <div style={{ height: innerHeight, position: 'relative' }}>
            { endIndex - startIndex > 0 && Array(endIndex - startIndex).fill().map((item, index) => {
                let currentIndex = startIndex + index;
                return children(currentIndex, currentIndex * rowHeight);
            })}
        </div>
    </div>
));

const StyledTbody = styled(Tbody).attrs(({ isPrinting, height }) => (
    isPrinting === false ? { style: { height } } : null
))`
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    overflow-y: ${props => props.isPrinting || props.innerHeight === props.height ? 'hidden': 'auto'};
    overflow-x: ${props => props.isPrinting ? 'hidden': 'auto'};
    border-bottom: 1px solid #ddd;
`;

const ExtendedStyledTbody = styled(StyledTbody)(getExtendedStyles());
export default ExtendedStyledTbody;
