import React from 'react';
import { SET_LIMIT } from '../../actions';
import Field from '../../components/Field';
import Label from '../../components/Label';
import { isUndefined } from '../../utils';

const Limiter = ({ options, limit, action, style }) => {
    const setLimit = ( limit ) => action(SET_LIMIT)({ limit });
    return (
        <Label className="rdt-limiter-label" flex noWrap>
            <Field.Select
                id="limiter"
                className="rdt-limiter-select"
                value={ limit }
                onChange={ ( event ) => setLimit(event.target.value) }>
                { options.map( (option, index) =>
                    <option key={ index } value={ option }>{ option !== 0 ? option : 'All' }</option>
                ) }
            </Field.Select>&nbsp;per page
        </Label>
    );
};

export default Limiter;
