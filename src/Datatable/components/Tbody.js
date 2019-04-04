import React from 'react';
import styled, { css } from 'styled-components';

const Outer = styled.div `
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    ${props => props.height && css `
        height: ${props.height}
    `};
    overflow-y: scroll;
    overflow-x: scroll;
`

export const Inner = styled.div.attrs(({ width = '100%' }) => ({
    style: { width }
})) `
    position: relative;
    border-bottom: ${props => props.borderBottom || '1px solid #ddd'};
    ${props => props.height && css `
        height: ${props.height}
    `};
`

const Tbody = React.forwardRef(({
    children,
    data,
    height,
    overScanCount = 10,
    rowHeight,
    rowWidth,
    startTop,
    visibleHeight,
    width
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
        <Outer ref={ ref } height={ `${height > visibleHeight ? visibleHeight : height}px` }>
            <Inner width={ `${width}px` } height={ `${height}px` }>
                { slicedData.map((item, index) => {
                    let currentIndex = startIndex + index;
                    return children({ item, top: currentIndex * rowHeight, index: currentIndex })
                })}
            </Inner>
        </Outer>
    );
});

export default Tbody;
