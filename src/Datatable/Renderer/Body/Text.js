import _ from 'lodash';
import { shouldUpdate } from '../../../utils';
import React, { Fragment, Component } from 'react';

class Text extends Component {
    shouldComponentUpdate( nextProps ) {
        return shouldUpdate(this.props.data, nextProps.data, this.props.index);
    }

    render() {
        const { data, index, colConfig: { name } } = this.props;
        return <Fragment>{ _.get(data, name, '') }</Fragment>
    }
}

export default Text;
