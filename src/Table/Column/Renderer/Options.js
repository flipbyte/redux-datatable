import React, { Component } from 'react';
import Time from 'react-pure-time';
import get from 'lodash/get';
import { shouldUpdate } from '../../../utils';

class Options extends Component {
    shouldComponentUpdate( nextProps ) {
        return shouldUpdate(this.props.data, nextProps.data, this.props.index);
    }

    render() {
        const { data, index, colConfig: { options, textAlign } } = this.props;
        const value = get(data, index);

        if(!options || !options[value]) {
            return <td>{ value }</td>
        }

        return (
            <td className={ textAlign ? textAlign : '' }>
                <span className={ (options[value].badge ? 'badge ' + options[value].badge : '') }>
                    { options[value].value }
                </span>
            </td>
        );
    }
}

export default Options;
