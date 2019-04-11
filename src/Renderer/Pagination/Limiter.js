import React from 'react';
import { SET_LIMIT } from '../../actions';
import Field from '../../components/Field';
import Label from '../../components/Label';

const Limiter = ({ options, limit, action, style, default: defaultLimit }) => {
    const setLimit = ( limit ) => action(SET_LIMIT)({ limit });
    return (
        <Label flex noWrap>
            <Field.Select
                id="limiter"
                value={ limit || defaultLimit }
                onChange={ ( event ) => setLimit(event.target.value) }>
                { options.map( (option, index) =>
                    <option key={ index } value={ option }>{ option !== 0 ? option : 'All' }</option>
                ) }
            </Field.Select> per page
        </Label>
    );
};

export default Limiter;
