import _ from 'lodash';
import Time, { format as formatDate } from 'react-pure-time';
import React, { Fragment } from 'react';
import Field from '../../components/Field';
import Row from '../../components/Row';

const Date = ({
    data,
    index,
    isEditing,
    handleChange,
    modifiedData,
    colConfig: { name, textAlign, format, editable }
}) => (
    <Fragment>
        { (!editable || !isEditing) && <Time value={ _.get(data, name, '') } format={ format ? format : 'F j, Y, g:i a' } /> }
        { !!editable && isEditing && (
            <Row padding="0 0 5px">
                <Field.Input
                    type="date"
                    name={ name }
                    onChange={ handleChange }
                    value={ formatDate(_.get(modifiedData, name) || _.get(data, name, ''), 'Y-m-d') }
                />
            </Row>
        )}
    </Fragment>
);

export default Date;
