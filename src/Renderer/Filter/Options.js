import _ from 'lodash';
import React from 'react';
import { OPERATOR } from '../../constants';
import Field from '../../components/Field';

const applyFilter = ( filterer, event ) => {
    let filter = {};
    if (event.target.value) {
        filter = {
            operator: OPERATOR.IS,
            field: event.target.name,
            value: event.target.value,
            logic: 'where',
        };
    }

    filterer(event.target.name, filter);
};

const Options = ({ name, value = '', filterer, options }) => (
    <Field.Select
        className="rdt-filter-select"
        name={ name }
        value={ value }
        onChange={ applyFilter.bind(this, filterer) }
    >
        <option></option>
        { _.map(options, ({ label }, key ) => (
            <option key={ key } value={ key }>{ label }</option>
        ) )}
    </Field.Select>
);

export default Options;
