import React from 'react';
import PropTypes from "prop-types";
import Time from 'react-pure-time';

const Date = ({ index, data }) =>
    <td>
        <Time value={ data[index] } format="F j, Y, g:i a" />
    </td>

export default Date;
