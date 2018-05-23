import React from 'react';
import PropTypes from "prop-types";
import { getParam, getConfigParam } from '../../../utils';

const _handleSelection = ({ data, config, setSelection }, event ) => {
    let dataKey = getConfigParam(config.indexField);
    let param = getParam(config.indexField, data);
    setSelection(dataKey, param, event.target.checked)
}

const _isSelected = ({ data, selection, config }) => {
    let dataKey = getConfigParam(config.indexField);
    let param = getParam(config.indexField, data);
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

Selection.contextTypes = {
    router: PropTypes.object
};

export default Selection;
