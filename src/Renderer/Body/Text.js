import _ from 'lodash';
import React, { Fragment } from 'react';
import Field from '../../components/Field';
import Row from '../../components/Row';

const Text = ({
    data,
    index,
    isEditing,
    handleChange,
    isModified,
    modifiedValue,
    value = '',
    colConfig: { name, editable }
}) => (
    <Fragment>
        { (!editable || !isEditing) && value }
        { !!editable && isEditing && (
            <Row padding="0 0 5px">
                <Field.Input
                    type="text"
                    name={ name }
                    onChange={ handleChange }
                    modified={ isModified }
                    className={ isModified ? 'modified' : ''}
                    value={ value }
                />
            </Row>
        )}
    </Fragment>
);

export default Text;
