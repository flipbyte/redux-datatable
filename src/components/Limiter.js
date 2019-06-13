import React from 'react';
import { SET_LIMIT } from '../actions';
import { isUndefined } from '../utils';
import { Field, Label } from '../styled-components';

const Limiter = ({
    config: { options },
    limit,
    action,
    config: { styles }
}) => {
    const setLimit = ( limit ) => action(SET_LIMIT)({ limit });
    return (
        <Label className="rdt-limiter-label" flex noWrap styles={ styles }>
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

Limiter.mapPropsToComponent = ({
    paginationProps: { limit },
    action
}) => ({ limit, action });

export default Limiter;
