import React from 'react';
import PropTypes from "prop-types";

const _handleSelection = (event) => {
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
};

const Selection = ({ name }) =>
    <td>
        <div className="col-12">
            <input type="checkbox" id="exampleCheck1"
                onChange={ (event) => _handleSelection(event) }/>
        </div>
    </td>

Selection.propTypes = {
    name: PropTypes.string.isRequired
};

export default Selection;
