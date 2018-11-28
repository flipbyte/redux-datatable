import _ from 'lodash';
import React, { Fragment, Component } from 'react';

class Body extends Component {
    render() {
        const { data, startTop, rowHeight, rowWidth, renderItem, overScanCount = 10, visibleHeight } = this.props;
        const visibleLower =  startTop - overScanCount * rowHeight;
        const visibleUpper = startTop + visibleHeight + overScanCount * rowHeight;

        let startIndex = Math.floor(visibleLower / rowHeight);
        if(startIndex < 0) {
            startIndex = 0;
        }

        const endIndex = Math.ceil(visibleUpper / rowHeight);
        const slicedData = data.slice(startIndex, endIndex);

        return (
            <Fragment>
                { _.map(slicedData, (item, index) => {
                    let currentIndex = startIndex + index;
                    return renderItem({ index: currentIndex, item, top: currentIndex * rowHeight })
                }) }
            </Fragment>
        )
    }
}

export default Body;
