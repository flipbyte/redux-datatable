import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { OPERATOR } from '../Filter';
import { withTableConfig } from '../../../TableProvider';
import Styles from '../../Styles';

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
            operator: OPERATOR.BETWEEN,
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
        <Styles.Row padding="0 0 5px">
            <input
                type="number"
                name={ colName }
                onChange={ applyFilter.bind(this, 0, filterer) }
                value={ value[0] ? value[0] : '' }
                placeholder="From" />
            </Styles.Row>
        <Styles.Row>
            <input
                type="number"
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
})(connect(mapStateToProps)(Number));