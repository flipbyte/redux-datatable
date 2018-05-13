import React from 'react';
import PropTypes from "prop-types";

const Limiter = ({ name, url, options, setLimit }) =>
    <select className="form-control" id="limiter" onChange={ (event) => setLimit(name, url, event.target.value) }>
        { options.map( (option, index) =>
            <option key={ index }>{ option }</option>
        ) }
    </select>

Limiter.propTypes = {
    options: PropTypes.array.isRequired,
    setLimit: PropTypes.func
}

export default Limiter;
