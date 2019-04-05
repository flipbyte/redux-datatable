import React from 'react';
import styled, { css } from 'styled-components';
import { getExtendedStyles } from '../utils';

const Tbody = React.forwardRef(({
    className,
    style,
    children,
    data,
    height,
    innerHeight,
    overScanCount = 10,
    rowHeight,
    rowWidth,
    startTop,
    visibleHeight,
    width = '100%'
}, ref) => {
    const visibleLower =  startTop - overScanCount * rowHeight;
    const visibleUpper = startTop + visibleHeight + overScanCount * rowHeight;

    let startIndex = Math.floor(visibleLower / rowHeight);
    if(startIndex < 0) {
        startIndex = 0;
    }

    const endIndex = Math.ceil(visibleUpper / rowHeight);
    const slicedData = data.slice(startIndex, endIndex);

    return (
        <div className={ className } style={ style } ref={ ref }>
            <div style={{ width, height: innerHeight, position: 'relative' }}>
                { slicedData.map((item, index) => {
                    let currentIndex = startIndex + index;
                    return children({ item, top: currentIndex * rowHeight, index: currentIndex })
                })}
            </div>
        </div>
    );
});


const StyledTbody = styled(Tbody).attrs(({ height }) => ({
    style: { height }
})) `
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    overflow-y: scroll;
    overflow-x: scroll;
    border-bottom: 1px solid #ddd;
`
const ExtendedStyledTbody = styled(StyledTbody)(getExtendedStyles())
export default ExtendedStyledTbody;
