import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { OPERATOR } from '../Filter';
import { withTableConfig } from '../../../TableProvider';

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
    <input
        name={ name }
        value={ value }
        onChange={ applyFilter.bind(this, filterer) } />


export default String;
