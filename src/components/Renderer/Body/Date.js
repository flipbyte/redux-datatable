import _ from 'lodash';
import Time, { format as formatDate } from 'react-pure-time';
import React, { Fragment } from 'react';
import { Field, Row } from '../../../styled-components';

const Date = ({
    data,
    index,
    isEditing,
    handleChange,
    isModified,
    modifiedValue,
    value = '',
    colConfig: { name, textAlign, format, editable }
}) => (
    <Fragment>
        { (!editable || !isEditing) && <Time value={ value } format={ format ? format : 'F j, Y, g:i a' } /> }
        { !!editable && isEditing && (
            <Row padding="0 0 5px">
                <Field.Input
                    type="date"
                    name={ name }
                    onChange={ handleChange }
                    modified={ isModified }
                    className={ isModified ? 'modified' : ''}
                    value={ formatDate(value, 'Y-m-d') }
                    autocomplete="off"
                />
            </Row>
        )}
    </Fragment>
);

export default Date;
