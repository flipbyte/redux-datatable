import React from 'react';
import PropTypes from "prop-types";
import { getConfigParam } from '../utils';

const _handleSelection = ( selector, data, config, event ) => {
    let dataKey = getConfigParam(config.indexField);
    if(!dataKey) {
        return false;
    }

    var params = data.map(item => item[dataKey]);

    selector(dataKey, params, event.target.checked);
};

const Selection = ({ name, data, config, selector }) =>
    <td>
        <div className="col-12">
            <input type="checkbox" name={ name }
                onChange={ (event) => _handleSelection(selector, data, config, event) }/>
        </div>
    </td>

Selection.propTypes = {
    selector: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default Selection;
