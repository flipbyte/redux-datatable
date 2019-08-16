import React, { Fragment } from 'react';
import { OPERATOR } from '../../../constants';
import { Field, Row, Datetime } from '../../../styled-components';
import moment from 'moment';

var dateFrom = null;
var dateTo = null;

const applyFilter = ( name, key, filterer, format, value ) => {
    let filter = {};

    if (key === 0) {
        dateFrom = moment(value).format(format);
    } else {
        dateTo = moment(value).format(format);
    }

    if (dateFrom || dateTo) {
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

const Date = ({
    name,
    value = [],
    filterer,
    inputFormat = 'YYYY-MM-DD',
    parse = 'YYYY-MM-DD HH:mm:ss',
    showTimeSelect = false
}) => (
    <Fragment>
        <Row padding="0 0 5px">
            <Datetime
                className="rdt-filter-input date to"
                value={ value[0] ? moment(value[0], parse).format(inputFormat) : '' }
                placeholder="From"
                showTimeSelect={ showTimeSelect }
                onChange={ applyFilter.bind(this, name, 0, filterer, parse) }
                selected={ value[0] && moment(value[0], parse).toDate() }
                dateFormat={ inputFormat }
            />
        </Row>
        <Row>
            <Datetime
                className="rdt-filter-input date to"
                value={ value[1] ? moment(value[1], parse).format(inputFormat) : '' }
                placeholder="To"
                showTimeSelect={ showTimeSelect }
                onChange={ applyFilter.bind(this, name, 1, filterer, parse) }
                selected={ value[1] && moment(value[1], parse).toDate() }
                dateFormat={ inputFormat }
            />
        </Row>
    </Fragment>
);

export default Date;
