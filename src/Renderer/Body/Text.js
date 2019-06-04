import _ from 'lodash';
import React, { Fragment } from 'react';
import Field from '../../components/Field';
import Row from '../../components/Row';

const Text = ({
    data,
    index,
    isEditing,
    handleChange,
    modifiedData,
    colConfig: { name, editable }
}) => (
    <Fragment>
        { (!editable || !isEditing) && _.get(data, name, '') }
        { !!editable && isEditing && (
            <Row padding="0 0 5px">
                <Field.Input
                    type="text"
                    name={ name }
                    onChange={ handleChange }
                    value={ _.get(modifiedData, name) || _.get(data, name, '') }
                />
            </Row>
        )}
    </Fragment>
);

export default Text;
