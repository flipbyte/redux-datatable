import React, { Fragment } from 'react';
import { OPERATOR } from '../../constants';
import Row from '../../components/Row';
import Field from '../../components/Field';

var valFrom = null;
var valTo = null;

const applyFilter = ( key, filterer, event ) => {
    let filter = {};

    if (key === 0) {
        valFrom = event.target.value;
    } else {
        valTo = event.target.value;
    }

    if ( valFrom || valTo ) {
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

const Number = ({ name, value = [], filterer }) => (
    <Fragment>
        <Row padding="0 0 5px">
            <Field.Input
                className="rdt-filter-input number from"
                type="number"
                name={ name }
                onChange={ applyFilter.bind(this, 0, filterer) }
                value={ value[0] || '' }
                placeholder="From"
            />
        </Row>
        <Row>
            <Field.Input
                className="rdt-filter-input number to"
                type="number"
                name={ name }
                value={ value[1] || ''}
                onChange={ applyFilter.bind(this, 1, filterer) }
                placeholder="To"
            />
        </Row>
    </Fragment>
);

export default Number;
