import React from 'react';
import Time from 'react-pure-time';
import get from 'lodash/get';

const Options = ({ index, data, colConfig: { options, textAlign } }) => {
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
