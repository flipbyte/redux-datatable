import React from 'react';
import { OPERATOR } from '../../../constants';
import { Field } from '../../../styled-components';

const applyFilter = ( filterer, event ) => {
    let filter = {};
    if (event.target.value) {
        filter = {
            operator: OPERATOR.CONTAINS,
            field: event.target.name,
            value: event.target.value,
            logic: 'where',
        };
    }

    filterer(event.target.name, filter);
};

const String = ({ name, value = '', filterer }) => (
    <Field.Input
        className="rdt-filter-input string"
        name={ name }
        value={ value }
        onChange={ applyFilter.bind(this, filterer) }
        autocomplete="off"
    />
);

export default String;
