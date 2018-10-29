import React from 'react';
import get from 'lodash/get';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { setSelection } from '../actions';
import { withTableConfig } from '../TableProvider';
import { getConfigParam, prepareActionPayload } from '../utils';

const _handleSelection = ( selector, data, config, event ) => {
    let dataKey = getConfigParam(config.indexField);
    if(!dataKey) {
        return false;
    }

    var params = data.map(item => item[dataKey]);

    selector(dataKey, params, event.target.checked);
};

const Selection = ({ data, columnConfig, selector }) =>
    <td>
        <div className="col-12">
            <input type="checkbox" name={ columnConfig.name }
                onChange={ (event) => _handleSelection(selector, data, columnConfig, event) }/>
        </div>
    </td>

const mapStateToProps = ( state, { config: { reducerName, name } } ) => ({
    data: get(state, [reducerName, name, 'items'], [])
});

const mapDispatchToProps = ( dispatch, { config } ) => ({
    selector: ( paramKey, key, value ) =>
        dispatch(setSelection(prepareActionPayload(config)({ paramKey, key, value })))
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    routes: 'routes'
})(connect(mapStateToProps, mapDispatchToProps)(Selection));
