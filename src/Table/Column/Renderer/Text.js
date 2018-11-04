import React, { Component } from 'react';
import get from 'lodash/get';
import { shouldUpdate } from '../../../utils';

class Text extends Component {
    shouldComponentUpdate( nextProps ) {
        return shouldUpdate(this.props.data, nextProps.data, this.props.index);
    }

    render() {
        const { data, index, colConfig: { textAlign } } = this.props;
        return <td className={ textAlign ? textAlign : '' }> { get(data, index, '') } </td>
    }
}

export default Text;
