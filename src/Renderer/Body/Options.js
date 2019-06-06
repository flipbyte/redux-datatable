import _ from 'lodash';
import Time from 'react-pure-time';
import React, { Fragment } from 'react';
import Field from '../../components/Field';
import Row from '../../components/Row';

const Options = ({
    data,
    isEditing,
    handleChange,
    modifiedValue,
    colConfig: { name, options, editable }
}) => {
    const value = _.get(data, name);
    if (!editable || !isEditing) {
        if(!options || !options[value]) {
            return <Fragment>{ value }</Fragment>;
        }

        return (
            <span className={ (options[value].badge ? 'badge ' + options[value].badge : '') }>
                { options[value].label }
            </span>
        );
    }

    return !!editable && isEditing && (
        <Row padding="0 0 5px">
            <Field.Select
                name={ name }
                value={ modifiedValue || value || '' }
                modified={ !!modifiedValue }
                className={ !!modifiedValue ? 'modified' : ''}
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

export default Options;
