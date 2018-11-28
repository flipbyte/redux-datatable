import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { setLimit } from '../actions';
import { prepareActionPayload } from '../utils'
import { withTableConfig } from '../TableProvider';

const Limiter = ({ config: { options }, selectedOption, setLimit }) =>
    <label className="limiter d-flex">
        <select
            className="form-control input-sm"
            id="limiter"
            value={ selectedOption }
            onChange={ ( event ) => setLimit(event.target.value) }>
            { options.map( (option, index) =>
                <option key={ index } value={ option }>{ option !== 0 ? option : 'All' }</option>
            ) }
        </select> per page
    </label>

const mapStateToProps = ( initialState, { config: { reducerName, name } } ) => ( state ) => ({
    selectedOption: _.get(state, [reducerName, name, 'query', 'limit'], 10)
});

const mapDispatchToProps = ( dispatch, { config } ) => ({
    setLimit: ( limit ) => dispatch(setLimit(prepareActionPayload(config)({ limit })))
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    options: 'limiterConfig.options',
    routes: 'routes',
    entity: 'entity'
})(connect(mapStateToProps, mapDispatchToProps)(Limiter));
