import React, { Fragment } from 'react';
import { Field, Row, Datetime } from '../../../styled-components';
import { withData } from '../../../hoc';
import moment from 'moment';

const Date = ({
    isEditing,
    handleChange,
    isModified,
    value = '',
    colConfig: {
        name,
        format = 'MMM Do, YYYY hh:mm:ss A',
        parse = 'YYYY-MM-DD HH:mm:ss',
        inputFormat = 'YYYY-MM-DD'
    }
}) => {
    const datetime = moment(value, parse);
    return (
        <Fragment>
            { !isEditing && datetime.format(format) }
            { isEditing && (
                <Row padding="0 0 5px">
                    <Datetime
                        name={ name }
                        onChange={ handleChange }
                        modified={ isModified }
                        className={ isModified ? 'modified' : ''}
                        value={ datetime.format(inputFormat) }
                        selected={ datetime.toDate() }
                    />
                </Row>
            )}
        </Fragment>
    );
}

export default withData(Date);
