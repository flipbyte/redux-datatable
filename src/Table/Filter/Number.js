import React from 'react';
import get from 'lodash/get';
import PropTypes from "prop-types";
import { SEARCH_OPERATOR_BETWEEN } from '../Filter';
import { connect } from 'react-redux';
import { withTableConfig } from '../../TableProvider';

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

const Number = ({ colName, value, filterer }) =>
    <td>
        <input
            className="form-control"
            type="number"
            name={ colName }
            onChange={ (event) => _applyFilter(0, filterer, event) }
            value={ value[0] ? value[0] : '' }
            placeholder="From" />
        <input
            className="form-control"
            type="number"
            name={ colName }
            value={ value[1] ? value[1] : ''}
            onChange={ (event) => _applyFilter(1, filterer, event) }
            placeholder="To" />
    </td>

Number.propTypes = {
    filterer: PropTypes.func.isRequired,
    colName: PropTypes.string.isRequired
};

const mapStateToProps = ( state, { config: { reducerName, name }, colName } ) => ({
    value: get(state, [reducerName, name, 'query', 'search', colName, 'value'], [])
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
})(connect(mapStateToProps)(Number));
