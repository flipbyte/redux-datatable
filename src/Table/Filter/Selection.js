import React from 'react';
import PropTypes from "prop-types";

const _handleSelection = (tableName, url, event) => {
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
    // filterer(tableName, url, event.target.name, filter);
};

const Selection = ({ tableName, url, name }) =>
    <td>
        <div className="col-12">
            <input type="checkbox" id="exampleCheck1"
                onChange={ (event) => _handleSelection(tableName, url, event) }/>
        </div>
    </td>

Selection.propTypes = {
    tableName: PropTypes.string.isRequired,
    url: PropTypes.string,
    filterer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default Selection;
