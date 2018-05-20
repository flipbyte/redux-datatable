import React from 'react';
import PropTypes from "prop-types";
import { paramsResolver } from '../../utils';

const _handleSelection = ( selector, event ) => {
    let params = paramsResolver(action.params, data);
    // let filter = {};
    // if(event.target.value) {
    //     filter = {
    //         operator: SEARCH_OPERATOR_CONTAINS,
    //         field: event.target.name,
    //         value: event.target.value,
    //         logic: 'where',
    //     };
    // }
    //
    // filterer(event.target.name, filter);

    selector(event.target.name, 0, event.target.value);
};

const Selection = ({ name, selector }) =>
    <td>
        <div className="col-12">
            <input type="checkbox" name={ name }
                onChange={ (event) => _handleSelection(selector, event) }/>
        </div>
    </td>

Selection.propTypes = {
    selector: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default Selection;
