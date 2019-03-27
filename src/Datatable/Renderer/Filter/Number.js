import PropTypes from "prop-types";
import React, { Fragment } from 'react';
import { OPERATOR } from '../Filter';
import Styles from '../../Styles';

var valFrom = null;
var valTo = null;

const applyFilter = ( key, filterer, event ) => {
    let filter = {};

    if(key == 0) {
        valFrom = event.target.value;
    } else {
        valTo = event.target.value;
    }

    if( valFrom || valTo ) {
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

const Number = ({ name, value = [], filterer }) =>
    <Fragment>
        <Styles.Row padding="0 0 5px">
            <Styles.Elements.Input
                type="number"
                name={ name }
                onChange={ applyFilter.bind(this, 0, filterer) }
                value={ value[0] || '' }
                placeholder="From" />
        </Styles.Row>
        <Styles.Row>
            <Styles.Elements.Input
                type="number"
                name={ name }
                value={ value[1] || ''}
                onChange={ applyFilter.bind(this, 1, filterer) }
                placeholder="To" />
        </Styles.Row>
    </Fragment>

export default Number;
