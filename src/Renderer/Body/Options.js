import _ from 'lodash';
import Time from 'react-pure-time';
import React, { Fragment } from 'react';
import Field from '../../components/Field';
import Row from '../../components/Row';

const Options = ({
    data,
    isEditing,
    handleChange,
    modifiedData,
    colConfig: { name, options, isEditable }
}) => {
    const value = _.get(data, name);
    if (!isEditable || !isEditing) {
        if(!options || !options[value]) {
            return <Fragment>{ value }</Fragment>;
        }

        return (
            <span className={ (options[value].badge ? 'badge ' + options[value].badge : '') }>
                { options[value].label }
            </span>
        );
    }

    return !!isEditable && isEditing && (
        <Row padding="0 0 5px">
            <Field.Select name={ name } value={ _.get(modifiedData, name) || value } onChange={ handleChange }>
                <option></option>
                { _.map(options, ({ label }, key ) => (
                    <option key={ key } value={ key }>{ label }</option>
                ) )}
            </Field.Select>
        </Row>
    );
};

export default Options;
