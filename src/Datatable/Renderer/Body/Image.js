import _ from 'lodash';
import { shouldUpdate } from '../../../utils';
import React, { Fragment, Component } from 'react';

class Image extends Component {
    shouldComponentUpdate({ data, colConfig: { name } }) {
        return shouldUpdate(this.props.data, data, name);
    }

    render() {
        const { data, index, colConfig: { name, imgWidth, imgHeight } } = this.props;
        return <img src={ _.get(data, name, '') } width={ imgWidth } height={ imgHeight } />
    }
}

export default Image;
