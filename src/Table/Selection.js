import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { setSelection } from '../actions';
import { withTableConfig } from '../TableProvider';
import { getConfigParam, prepareActionPayload } from '../utils';

const handleSelection = ( selector, data, config, event ) => {
    let dataKey = getConfigParam(config.indexField);
    let params = event.target.checked
        ? _.mapValues(_.invert(_.assign({}, data)), () => event.target.checked)
        : {};

    selector(dataKey, params);
};

const Selection = ({ data, columnConfig, selector }) =>
    <div className="col-12">
        <input type="checkbox" name={ columnConfig.name }
            onChange={ handleSelection.bind(this, selector, data, columnConfig) }/>
    </div>

const mapStateToProps = ( initialState, { config: { reducerName, name } } ) => ( state ) => ({
    data: _.get(state, [reducerName, name, 'items'], [])
});

const mapDispatchToProps = ( dispatch, { config } ) => ({
    selector: ( paramKey, key, value ) =>
        dispatch(setSelection(prepareActionPayload(config)({ paramKey, key, value })))
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    routes: 'routes',
    entity: 'entity'
})(connect(mapStateToProps, mapDispatchToProps)(Selection));