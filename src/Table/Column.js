import React from 'react';
import PropTypes from "prop-types";

const Column = ({ index, data }) =>
    <td> { data[index] } </td>

export default Column;
