import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { SEARCH_OPERATOR_BETWEEN } from '../Filter';
import { withTableConfig } from '../../TableProvider';

var valFrom = null;
var valTo = null;

const applyFilter = ( key, filterer, event ) => {
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
    <Fragment>
        <input
            className="form-control"
            type="number"
            name={ colName }
            onChange={ applyFilter.bind(this, 0, filterer) }
            value={ value[0] ? value[0] : '' }
            placeholder="From" />
        <input
            className="form-control"
            type="number"
            name={ colName }
            value={ value[1] ? value[1] : ''}
            onChange={ applyFilter.bind(this, 1, filterer) }
            placeholder="To" />
    </Fragment>

const mapStateToProps = ( state, { config: { reducerName, name }, colName } ) => ({
    value: _.get(state, [reducerName, name, 'query', 'search', colName, 'value'], [])
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
})(connect(mapStateToProps)(Number));
