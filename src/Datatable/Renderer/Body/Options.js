import _ from 'lodash';
import Time from 'react-pure-time';
import { shouldUpdate } from '../../../utils';
import React, { Fragment, Component } from 'react';

class Options extends Component {
    shouldComponentUpdate( nextProps ) {
        return shouldUpdate(this.props.data, nextProps.data, this.props.index);
    }

    render() {
        const { data, colConfig: { name, options } } = this.props;
        const value = _.get(data, name);

        if(!options || !options[value]) {
            return <Fragment>{ value }</Fragment>
        }

        return (
            <span className={ (options[value].badge ? 'badge ' + options[value].badge : '') }>
                { options[value].value }
            </span>
        );
    }
}

export default Options;
