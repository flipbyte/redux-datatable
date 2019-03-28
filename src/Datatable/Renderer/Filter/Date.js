import PropTypes from "prop-types";
import React, { Fragment } from 'react';
import { OPERATOR } from '../Filter';
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

const Date = ({ name, value = [], filterer }) =>
    <Fragment>
        <Styles.Row padding="0 0 5px">
            <Styles.Elements.Field.Input
                type="date"
                name={ name }
                value={ value[0] || '' }
                onChange={ applyFilter.bind(this, 0, filterer) }
                placeholder="From" />
        </Styles.Row>
        <Styles.Row>
            <Styles.Elements.Field.Input
                type="date"
                name={ name }
                value={ value[1] || '' }
                onChange={ applyFilter.bind(this, 1, filterer) }
                placeholder="To" />
        </Styles.Row>
    </Fragment>;

export default Date;
