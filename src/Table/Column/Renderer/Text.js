import React from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';

const Text = ({ index, data }) =>
    <td> { get(data, index, '') } </td>

export default Text;
