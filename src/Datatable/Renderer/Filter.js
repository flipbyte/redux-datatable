import _ from 'lodash';
import React from 'react';
import Styles from '../Styles';
import { SET_FILTER } from '../../actions';

import Date from './Filter/Date';
import String from './Filter/String';
import Number from './Filter/Number';

export const OPERATOR = {
    IS: 'is',
    IN: 'in',
    NOT_IN: 'not_in',
    BETWEEN: 'between',
    CONTAINS: 'contains'
}

export const TYPE = {
    DATE: 'date'
}

const filterers = {
    number: Number,
    date: Date,
    default: String
};

const Filterer = ( props ) => {
    const Component = filterers[props.type] || filterers['default'];
    return <Component { ...props } />
};

const Filter = ({ filterable, query, width, action, ...rest }) => {
    const { name } = rest;
    const filterer = ( key, filter ) => action(SET_FILTER)({ key, filter });
    const value = _.get(query, ['search', name, 'value']);

    return (
        <Styles.TableCell search width={ `${width}px` }>
            { filterable && <Filterer value={ value } filterer={ filterer } { ...rest } />}
        </Styles.TableCell>
    )
}

export default Filter;
