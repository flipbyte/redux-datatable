import React, { Fragment } from 'react';
import { OPERATOR } from '../../constants';
import Row from '../../components/Row';
import Field from '../../components/Field';

var dateFrom = null;
var dateTo = null;

const applyFilter = ( key, filterer, event ) => {
    let filter = {};

    if (key === 0) {
        dateFrom = event.target.value;
    } else {
        dateTo = event.target.value;
    }

    if ( dateFrom || dateTo ) {
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

const Date = ({ name, value = [], filterer }) => (
    <Fragment>
        <Row padding="0 0 5px">
            <Field.Input
                className="rdt-filter-input date from"
                type="date"
                name={ name }
                value={ value[0] || '' }
                onChange={ applyFilter.bind(this, 0, filterer) }
                placeholder="From"
                autocomplete="off"
            />
        </Row>
        <Row>
            <Field.Input
                className="rdt-filter-input date to"
                type="date"
                name={ name }
                value={ value[1] || '' }
                onChange={ applyFilter.bind(this, 1, filterer) }
                placeholder="To"
                autocomplete="off"
            />
        </Row>
    </Fragment>
);

export default Date;
