import PropTypes from "prop-types";
import React from 'react';
import { OPERATOR } from '../Filter';

const applyFilter = ( filterer, event ) => {
    let filter = {};
    if(event.target.value) {
        filter = {
            operator: OPERATOR.CONTAINS,
            field: event.target.name,
            value: event.target.value,
            logic: 'where',
        };
    }

    filterer(event.target.name, filter);
};

const String = ({ name, value = '', filterer }) =>
    <Styles.Elements.Input
        name={ name }
        value={ value }
        onChange={ applyFilter.bind(this, filterer) } />


export default String;
