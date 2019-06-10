import React from 'react';
import Loader from './Loader';

const Tbody = ({
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
}) => {
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
        <React.Fragment>
            { isFetching && <Loader styles={ loaderStyles }/> }
            <div style={{ width, height: innerHeight, position: 'relative' }}>
                { slicedData.map((item, index) => {
                    let currentIndex = startIndex + index;
                    return children({ item, top: currentIndex * rowHeight, index: currentIndex });
                })}
            </div>
        </React.Fragment>
    );
});

export default Tbody;
