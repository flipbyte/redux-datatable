import React, { Component } from 'react';
import Styles from '../Styles';

const TableBody = React.forwardRef(({
    children,
    data,
    width,
    height,
    startTop,
    rowHeight,
    rowWidth,
    renderItem,
    visibleHeight,
    overScanCount = 10
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
        <Styles.TableBody ref={ ref } height={ `${height > visibleHeight ? visibleHeight : height}px` }>
            <Styles.TableBodyInner width={ `${width}px` } height={ `${height}px` }>
                { slicedData.map((item, index) => {
                    let currentIndex = startIndex + index;
                    return renderItem({ index: currentIndex, item, top: currentIndex * rowHeight })
                })}
            </Styles.TableBodyInner>
        </Styles.TableBody>
    );
});

export default TableBody;
