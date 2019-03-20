import React from 'react';
import PropTypes from "prop-types";

const Limiter = ({ options, limit, setLimit }) =>
    <label className="limiter d-flex text-nowrap">
        <select
            className="form-control input-sm"
            id="limiter"
            value={ limit || defaultLimit }
            onChange={ ( event ) => setLimit(event.target.value) }>
            { options.map( (option, index) =>
                <option key={ index } value={ option }>{ option !== 0 ? option : 'All' }</option>
            ) }
        </select> per page
    </label>

export default Limiter;
