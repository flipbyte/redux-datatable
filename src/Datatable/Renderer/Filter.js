import React from 'react';
import Styles from '../Styles';

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
    return <Component />
};

const Filter = ({ filterable, width, ...rest }) =>
    <Styles.TableCell search width={ `${width}px` }>
        { filterable && <Filterer { ...rest } />}
    </Styles.TableCell>

export default Filter;
