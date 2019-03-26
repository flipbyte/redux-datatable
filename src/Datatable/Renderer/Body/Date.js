import _ from 'lodash';
import Time from 'react-pure-time';
import React, { Component } from 'react';
import { shouldUpdate } from '../../../utils';

class Date extends Component {
    shouldComponentUpdate({ data, colConfig: { name } }) {
        return shouldUpdate(this.props.data, data, name);
    }

    render() {
        const {
            data,
            index,
            colConfig: { name, textAlign, format }
        } = this.props;
        return <Time value={ _.get(data, name, '') } format={ format ? format : 'F j, Y, g:i a' } />
    }
}

export default Date;
