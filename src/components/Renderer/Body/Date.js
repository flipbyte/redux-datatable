import Time, { format as formatDate } from 'react-pure-time';
import React, { Fragment } from 'react';
import { Field, Row } from '../../../styled-components';
import withData from '../../../hoc/withData';

const Date = ({
    isEditing,
    handleChange,
    isModified,
    value = '',
    colConfig: { name, textAlign, format }
}) => (
    <Fragment>
        { !isEditing && <Time value={ value } format={ format ? format : 'F j, Y, g:i a' } /> }
        { isEditing && (
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

export default withData(Date);
