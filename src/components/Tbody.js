import React from 'react';
import styled, { css } from 'styled-components';
import { getExtendedStyles } from '../utils';
import Loader from './Loader';

const Tbody = React.forwardRef(({
    className,
    style,
    children,
    data,
    height,
    innerHeight,
    isFetching,
    isPrinting = false,
    loaderStyles = {},
    overScanCount = 10,
    rowHeight,
    rowWidth,
    startTop,
    visibleHeight,
    width = '100%'
}, ref) => {
    let slicedData = [];
    let startIndex = 0;
    if (isPrinting === false) {
        const visibleLower =  startTop - overScanCount * rowHeight;
        const visibleUpper = startTop + visibleHeight + overScanCount * rowHeight;

        startIndex = Math.floor(visibleLower / rowHeight);
        if(startIndex < 0) {
            startIndex = 0;
        }

        const endIndex = Math.ceil(visibleUpper / rowHeight);
        slicedData = data.slice(startIndex, endIndex);
    } else {
        slicedData = data.slice(0)
    }

    return (
        <div className={ className } style={ style } ref={ ref }>
            { isFetching && <Loader styles={ loaderStyles }/> }
            <div style={{ width, height: innerHeight, position: 'relative' }}>
                { slicedData.map((item, index) => {
                    let currentIndex = startIndex + index;
                    return children({ item, top: currentIndex * rowHeight, index: currentIndex });
                })}
            </div>
        </div>
    );
});

const StyledTbody = styled(Tbody).attrs(({ isPrinting, height }) => (
    isPrinting === false ? { style: { height } } : null
))`
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    overflow-y: ${props => props.isPrinting || props.innerHeight === props.visibleHeight ? 'hidden': 'scroll'};
    overflow-x: ${props => props.isPrinting ? 'hidden': 'scroll'};
    border-bottom: 1px solid #ddd;
`;
const ExtendedStyledTbody = styled(StyledTbody)(getExtendedStyles());
export default ExtendedStyledTbody;
