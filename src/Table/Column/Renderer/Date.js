import React from 'react';
import PropTypes from "prop-types";
import Time from 'react-pure-time';
import get from 'lodash/get';

const Date = ({ index, data, config }) => {
    const { textAlign, format } = config;
    return (
        <td className={ textAlign ? textAlign : '' }>
            <Time value={ get(data, index, '') } format={ format ? format : 'F j, Y, g:i a' } />
        </td>
    );
}
export default Date;
