import _ from 'lodash';
import React, { Fragment } from 'react';
import { Field, Row } from '../../../styled-components';

const Text = ({
    isEditing,
    handleChange,
    isModified,
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
                    autocomplete="off"
                />
            </Row>
        )}
    </Fragment>
);

export default Text;
