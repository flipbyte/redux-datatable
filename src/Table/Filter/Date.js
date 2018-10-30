import React from 'react';
import PropTypes from "prop-types";
import { SEARCH_OPERATOR_BETWEEN } from '../Filter';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { withTableConfig } from '../../TableProvider';

var dateFrom = null;
var dateTo = null;

const _applyFilter = (key, filterer, event) => {
    let filter = {};

    if(key == 0) {
        dateFrom = event.target.value;
    } else {
        dateTo = event.target.value;
    }

    if( dateFrom || dateTo ) {
        filter = {
            operator: SEARCH_OPERATOR_BETWEEN,
            field: event.target.name,
            value: [ dateFrom, dateTo ],
            logic: 'where',
            type: 'date',
        };
    }

    filterer(event.target.name, filter);
};

const Date = ({ colName, value, filterer }) =>
    <td>
        <input
            className="form-control"
            type="date"
            name={ colName }
            value={ value[0] ? value[0] : '' }
            onChange={ (event) => _applyFilter(0, filterer, event) }
            placeholder="From" />
        <input
            className="form-control"
            type="date"
            name={ colName }
            value={ value[1] ? value[1] : ''}
            onChange={ (event) => _applyFilter(1, filterer, event) }
            placeholder="To" />
    </td>

Date.propTypes = {
    filterer: PropTypes.func.isRequired,
    colName: PropTypes.string.isRequired
};

const mapStateToProps = ( state, { config: { reducerName, name }, colName } ) => ({
    value: get(state, [reducerName, name, 'query', 'search', colName, 'value'], [])
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
})(connect(mapStateToProps)(Date));
