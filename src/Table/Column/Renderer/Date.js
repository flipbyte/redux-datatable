import _ from 'lodash';
import Time from 'react-pure-time';
import React, { Component } from 'react';
import { shouldUpdate } from '../../../utils';

class Date extends Component {
    shouldComponentUpdate( nextProps ) {
        return shouldUpdate(this.props.data, nextProps.data, this.props.index);
    }

    render() {
        const { data, index, colConfig: { textAlign, format } } = this.props;
        return <Time value={ _.get(data, index, '') } format={ format ? format : 'F j, Y, g:i a' } />
    }
}

export default Date;
