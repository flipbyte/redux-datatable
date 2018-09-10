import React from 'react';
import PropTypes from "prop-types";
import Time from 'react-pure-time';
import get from 'lodash/get';

const Options = ({ index, data, config }) => {
    const { options, textAlign } = config;
    const value = get(data, index);

    if(!options || !options[value]) {
        return <td>{ value }</td>
    }

    return (
        <td className={ textAlign ? textAlign : '' }>
            <span className={ (options[value].badge ? 'badge ' + options[value].badge : '') }>{ options[value].value }</span>
        </td>
    );
}

export default Options;
