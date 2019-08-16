import React, { Fragment } from 'react';
import { OPERATOR } from '../../../constants';
import { Field, Row, Datetime } from '../../../styled-components';
import moment from 'moment';

var dateFrom = null;
var dateTo = null;

const applyFilter = ( name, key, filterer, value ) => {
    let filter = {};

    if (key === 0) {
        dateFrom = moment(value).format('YYYY-MM-DD HH:mm:ss');
    } else {
        dateTo = moment(value).format('YYYY-MM-DD HH:mm:ss');
    }

    if ( dateFrom || dateTo ) {
        filter = {
            operator: OPERATOR.BETWEEN,
            field: name,
            value: [ dateFrom, dateTo ],
            logic: 'where',
            type: 'date',
        };
    }

    filterer(name, filter);
};

const Date = ({ name, value = [], filterer }) => (
    <Fragment>
        <Row padding="0 0 5px">
            <Datetime
                name={ name }
                className="rdt-filter-input date to"
                value={ value[0] || '' }
                placeholder="From"
                dateFormat="YYYY-MM-DD HH:mm:ss"
                onChange={ applyFilter.bind(this, name, 0, filterer) }
            />
        </Row>
        <Row>
            <Datetime
                name={ name }
                className="rdt-filter-input date to"
                value={ value[1] || '' }
                onChange={ applyFilter.bind(this, name, 1, filterer) }
                placeholder="To"
                dateFormat="YYYY-MM-DD HH:mm:ss"
            />
        </Row>
    </Fragment>
);

export default Date;
