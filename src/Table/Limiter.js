import React from 'react';
import get from 'lodash/get';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { setLimit } from '../actions';
import { prepareActionPayload } from '../utils'
import { withTableConfig } from '../TableProvider';

const Limiter = ({ config: { options }, selectedOption, setLimit }) =>
    <label className="limiter d-flex justify-content-end">
        <select
            className="form-control input-sm"
            id="limiter"
            defaultValue={ selectedOption }
            onChange={ ( event ) => setLimit(event.target.value) }>
            { options.map( (option, index) =>
                <option key={ index } value={ option }>{ option !== 0 ? option : 'All' }</option>
            ) }
        </select> per page
    </label>

const mapStateToProps = ( state, { config: { reducerName, name } } ) => ({
    selectedOption: get(state, [reducerName, name, 'query', 'limit'], 10)
});

const mapDispatchToProps = ( dispatch, { config } ) => ({
    setLimit: ( limit ) => dispatch(setLimit(prepareActionPayload(config)({ limit })))
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    options: 'limiterConfig.options',
    routes: 'routes'
})(connect(mapStateToProps, mapDispatchToProps)(Limiter));
