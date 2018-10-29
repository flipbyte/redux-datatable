import React from 'react';
import PropTypes from "prop-types";
import { SEARCH_OPERATOR_BETWEEN } from '../Filter';

var valFrom = null;
var valTo = null;

const _applyFilter = (key, filterer, event) => {
    let filter = {};

    if(key == 0) {
        valFrom = event.target.value;
    } else {
        valTo = event.target.value;
    }

    if( valFrom || valTo ) {
        filter = {
            operator: SEARCH_OPERATOR_BETWEEN,
            field: event.target.name,
            value: [ valFrom, valTo ],
            logic: 'where',
            type: 'number',
        };
    }

    filterer(event.target.name, filter);
};

const Number = ({ colName, filterer }) =>
    <td>
        <input
            className="form-control"
            type="number"
            name={ colName }
            onChange={ (event) => _applyFilter(0, filterer, event) }
            placeholder="From" />
        <input
            className="form-control"
            type="number"
            name={ colName }
            onChange={ (event) => _applyFilter(1, filterer, event) }
            placeholder="To" />
    </td>

Number.propTypes = {
    filterer: PropTypes.func.isRequired,
    colName: PropTypes.string.isRequired
};

export default Number;
