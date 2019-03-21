import React from 'react';
import PropTypes from "prop-types";
import { SET_LIMIT } from '../../actions';

export const TYPE_LIMITER = 'limiter';

const Limiter = ({ options, limit, action, default: defaultLimit }) => {
    const setLimit = ( limit ) => action(SET_LIMIT)({ limit });
    return (
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
    );
}

export default Limiter;
