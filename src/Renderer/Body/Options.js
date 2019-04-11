import _ from 'lodash';
import Time from 'react-pure-time';
import React, { Fragment, Component } from 'react';

const Options = ({
    data,
    colConfig: { name, options }
}) => {
    const value = _.get(data, name);

    if(!options || !options[value]) {
        return <Fragment>{ value }</Fragment>;
    }

    return (
        <span className={ (options[value].badge ? 'badge ' + options[value].badge : '') }>
            { options[value].value }
        </span>
    );
};

export default Options;
