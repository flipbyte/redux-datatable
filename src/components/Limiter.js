import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { SET_LIMIT } from '../actions';
import { calculatePaginationProps } from '../utils';
import { Field, Label } from '../styled-components';
import ConfigContext from '../context';

const Limiter = ({
    config: { options, styles }
}) => {
    const {
        action,
        getData,
        defaultLimit,
        config: { reducerName, name }
    } = useContext(ConfigContext);
    const query = useSelector(getData((tableData) => tableData.query));
    const { limit } = calculatePaginationProps(query, defaultLimit)
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

export default Limiter;
