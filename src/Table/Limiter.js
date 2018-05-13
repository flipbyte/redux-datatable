import React from 'react';
import PropTypes from "prop-types";

const Limiter = ({ options }) =>
    <select className="form-control" id="limiter">
        { options.map( (option, index) =>
            <option key={ index }>{ option }</option>
        ) }
    </select>

Limiter.propTypes = {
    options: PropTypes.array.isRequired,
}

export default Limiter;
