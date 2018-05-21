import React from 'react';
import PropTypes from "prop-types";
import { getParam } from '../../../utils';

const _handleSelection = ({ data, config, setSelection }, event ) => {
    let param = getParam(config.indexField, data);
    setSelection(param)
}

const _isSelected = ({ data, selection, config }) => {
    let param = getParam(config.indexField, data);
    return (selection[param]) ? selection[param] : false;
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
