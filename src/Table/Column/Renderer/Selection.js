import React from 'react';
import get from 'lodash/get';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { setSelection } from '../../../actions';
import { withTableConfig } from '../../../TableProvider';
import { getParam, getConfigParam, prepareActionPayload } from '../../../utils';

const _handleSelection = ({ data, colConfig, setSelection }, event ) => {
    let dataKey = getConfigParam(colConfig.indexField);
    let param = getParam(colConfig.indexField, data);
    setSelection(dataKey, param, event.target.checked)
}

const _isSelected = ({ data, selection, colConfig }) => {
    let dataKey = getConfigParam(colConfig.indexField);
    let param = getParam(colConfig.indexField, data);
    return (selection[dataKey] && selection[dataKey][param]) ? selection[dataKey][param] : false;
}

const Selection = ( props ) =>
    <td>
        <div className="col-12">
            <input
                type="checkbox"
                checked={ _isSelected(props) }
                onChange={ (event) => _handleSelection(props, event) } />
        </div>
    </td>

const mapStateToProps = ( state, { config: { reducerName, name } } ) => ({
    selection: get(state, [reducerName, name, 'selection'], {})
});

const mapDispatchToProps = ( dispatch, { config } ) => ({
    setSelection: ( paramKey, key, value ) =>
        dispatch(setSelection(prepareActionPayload(config)({ paramKey, key, value }))),
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    routes: 'routes'
})(connect(mapStateToProps, mapDispatchToProps)(Selection));
