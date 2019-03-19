import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { OPERATOR } from '../Filter';
import { withTableConfig } from '../../../TableProvider';

const applyFilter = ( filterer, event ) => {
    let filter = {};
    if(event.target.value) {
        filter = {
            operator: OPERATOR.CONTAINS,
            field: event.target.name,
            value: event.target.value,
            logic: 'where',
        };
    }

    filterer(event.target.name, filter);
};

const String = ({ colName, value, filterer }) =>
    <Fragment>
        <input
            name={ colName }
            value={ value }
            onChange={ applyFilter.bind(this, filterer) } />
    </Fragment>

const mapStateToProps = ( state, { config: { reducerName, name }, colName } ) => ({
    value: _.get(state, [reducerName, name, 'query', 'search', colName, 'value'], '')
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
})(connect(mapStateToProps)(String));
