import React, { Component } from 'react';
import Styles from '../Styles';

const TableBody = React.forwardRef(({
    children,
    data,
    width,
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
        <Styles.TableBody ref={ ref }>
            <Styles.TableBodyInner width={ `${width}px` }>
                { slicedData.map((item, index) => {
                    let currentIndex = startIndex + index;
                    return renderItem({ index: currentIndex, item, top: currentIndex * rowHeight })
                })}
            </Styles.TableBodyInner>
        </Styles.TableBody>
    );
});

export default TableBody;
