import React, { Fragment } from 'react';
import { OPERATOR } from '../../../constants';
import { Field, Row, Datetime } from '../../../styled-components';

// import 'react-datepicker/dist/react-datepicker.css';

var dateFrom = null;
var dateTo = null;

const applyFilter = ( name, key, filterer, value ) => {
    console.log(value);
    let filter = {};

    if (key === 0) {
        dateFrom = value.toISOString();
    } else {
        dateTo = value.toISOString();
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

    filterer(event.target.name, filter);
};

const Date = ({ name, value = [], filterer }) => (
    <Fragment>
        <Row padding="0 0 5px">
            <Datetime
                className="rdt-filter-input date to"
                value={ value[0] || '' }
                placeholder="From"
                popperProps={{
                    positionFixed: true
                }}
                showYearDropdown
                showMonthDropdown
                useShortMonthInDropdown
                dateFormat="YYYY-MMMM-d, HH:mm"
                onChange={ applyFilter.bind(this, name, 0, filterer) }
            />
        </Row>
        <Row>
            <Datetime
                className="rdt-filter-input date to"
                value={ value[1] || '' }
                onChange={ applyFilter.bind(this, name, 1, filterer) }
                popperProps={{
                    positionFixed: true
                }}
                placeholder="To"
                dateFormat="YYYY-MMMM-d HH:mm:ss"
            />
        </Row>
    </Fragment>
);

export default Date;
