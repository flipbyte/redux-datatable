import React, { Component } from 'react';
import Time from 'react-pure-time';
import get from 'lodash/get';
import { shouldUpdate } from '../../../utils';

class Date extends Component {
    shouldComponentUpdate( nextProps ) {
        return shouldUpdate(this.props.data, nextProps.data, this.props.index);
    }

    render() {
        const { data, index, colConfig: { textAlign, format } } = this.props;
        return (
            <td className={ textAlign ? textAlign : '' }>
                <Time value={ get(data, index, '') } format={ format ? format : 'F j, Y, g:i a' } />
            </td>
        );
    }
}

export default Date;
