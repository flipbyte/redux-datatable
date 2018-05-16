import React from 'react';
import PropTypes from "prop-types";

const Actions = ({ data, config }) =>
    <td>
        { Object.keys(config.children).map( (key) => (
            <a href="">config.children[key].label</a>
        )) }
    </td>

export default Actions;
