import _ from 'lodash';
import { shouldUpdate } from '../../../utils';
import React, { Fragment, Component } from 'react';

class Image extends Component {
    shouldComponentUpdate( nextProps ) {
        return shouldUpdate(this.props.data, nextProps.data, this.props.index);
    }

    render() {
        const { data, index, colConfig: { name, imgWidth, imgHeight } } = this.props;
        return <img src={ _.get(data, name, '') } width={ imgWidth } height={ imgHeight } />
    }
}

export default Image;
