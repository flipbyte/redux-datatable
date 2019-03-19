import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { OPERATOR } from '../Filter';
import { withTableConfig } from '../../../TableProvider';
import Styles from '../../Styles';

var dateFrom = null;
var dateTo = null;

const applyFilter = ( key, filterer, event ) => {
    let filter = {};

    if(key == 0) {
        dateFrom = event.target.value;
    } else {
        dateTo = event.target.value;
    }

    if( dateFrom || dateTo ) {
        filter = {
            operator: OPERATOR.BETWEEN,
            field: event.target.name,
            value: [ dateFrom, dateTo ],
            logic: 'where',
            type: 'date',
        };
    }

    filterer(event.target.name, filter);
};

const Date = ({ colName, value, filterer }) =>
    <Fragment>
        <Styles.Row>
            <input
                type="date"
                name={ colName }
                value={ value[0] ? value[0] : '' }
                onChange={ applyFilter.bind(this, 0, filterer) }
                placeholder="From" />
        </Styles.Row>
        <Styles.Row>
            <input
                type="date"
                name={ colName }
                value={ value[1] ? value[1] : ''}
                onChange={ applyFilter.bind(this, 1, filterer) }
                placeholder="To" />
        </Styles.Row>
    </Fragment>


const mapStateToProps = ( state, { config: { reducerName, name }, colName } ) => ({
    value: _.get(state, [reducerName, name, 'query', 'search', colName, 'value'], [])
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
})(connect(mapStateToProps)(Date));
