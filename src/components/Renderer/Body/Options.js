import _ from 'lodash';
import Time from 'react-pure-time';
import React, { Fragment } from 'react';
import { Field, Row } from '../../../styled-components';
import { withData } from '../../../hoc';

const Options = ({
    isEditing,
    handleChange,
    isModified,
    value = '',
    colConfig: { name, options }
}) => {
    if (!isEditing) {
        if(!options || !options[value]) {
            return <Fragment>{ value }</Fragment>;
        }

        return (
            <span className={ (options[value].badge ? 'badge ' + options[value].badge : '') }>
                { options[value].label }
            </span>
        );
    }

    return isEditing && (
        <Row padding="0 0 5px">
            <Field.Select
                name={ name }
                modified={ isModified }
                className={ isModified ? 'modified' : ''}
                value={ value }
                onChange={ handleChange }
            >
                <option></option>
                { _.map(options, ({ label }, key ) => (
                    <option key={ key } value={ key }>{ label }</option>
                ) )}
            </Field.Select>
        </Row>
    );
};

export default withData(Options);
