import React from 'react';
import PropTypes from "prop-types";
import { SEARCH_OPERATOR_CONTAINS } from '../Filter';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { withTableConfig } from '../../TableProvider';

const _applyFilter = (filterer, event) => {
    let filter = {};
    if(event.target.value) {
        filter = {
            operator: SEARCH_OPERATOR_CONTAINS,
            field: event.target.name,
            value: event.target.value,
            logic: 'where',
        };
    }

    filterer(event.target.name, filter);
};

const String = ({ colName, value, filterer }) =>
    <td>
        <input
            className="form-control"
            name={ colName }
            value={ value }
            onChange={ (event) => _applyFilter(filterer, event) } />
    </td>

String.propTypes = {
    filterer: PropTypes.func.isRequired,
    colName: PropTypes.string.isRequired
};

const mapStateToProps = ( state, { config: { reducerName, name }, colName } ) => ({
    value: get(state, [reducerName, name, 'query', 'search', colName, 'value'], '')
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
})(connect(mapStateToProps)(String));
