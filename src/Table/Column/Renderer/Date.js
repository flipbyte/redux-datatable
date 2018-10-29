import React from 'react';
import Time from 'react-pure-time';
import get from 'lodash/get';

const Date = ({ index, data, colConfig }) => {
    const { textAlign, format } = colConfig;
    return (
        <td className={ textAlign ? textAlign : '' }>
            <Time value={ get(data, index, '') } format={ format ? format : 'F j, Y, g:i a' } />
        </td>
    );
}
export default Date;
