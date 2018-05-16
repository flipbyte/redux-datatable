import React from 'react';
import PropTypes from "prop-types";
import { SEARCH_OPERATOR_BETWEEN } from '../Filter';

var valFrom = null;
var valTo = null;

const _applyFilter = (key, tableName, url, filterer, event) => {
    let filter = {};

    console.log(event);

    if(key == 0) {
        valFrom = event.target.value;
    } else {
        valTo = (event.target.value >= valFrom) ? event.target.value : null;
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

    filterer(tableName, url, event.target.name, filter);
};

const Number = ({ tableName, url, name, filterer }) =>
    <td>
        <input
            className="form-control"
            type="number"
            name={ name }
            onChange={ (event) => _applyFilter(0, tableName, url, filterer, event) }
            placeholder="From" />
        <input
            className="form-control"
            type="number"
            name={ name }
            onChange={ (event) => _applyFilter(1, tableName, url, filterer, event) }
            placeholder="To" />
    </td>

Number.propTypes = {
    tableName: PropTypes.string.isRequired,
    url: PropTypes.string,
    filterer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default Number;
