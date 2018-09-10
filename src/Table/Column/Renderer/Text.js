import React from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';

const Text = ({ index, data, config }) =>
    <td className={ config.textAlign ? config.textAlign : '' }> { get(data, index, '') } </td>

export default Text;
