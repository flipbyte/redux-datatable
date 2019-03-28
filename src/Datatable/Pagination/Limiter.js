import React from 'react';
import PropTypes from "prop-types";
import { SET_LIMIT } from '../../actions';
import Styles from '../Styles';

export const TYPE_LIMITER = 'limiter';

const Limiter = ({ options, limit, action, style, default: defaultLimit }) => {
    const setLimit = ( limit ) => action(SET_LIMIT)({ limit });
    return (
        <Styles.Elements.Label flex noWrap>
            <Styles.Elements.Field.Select
                width="50%"
                id="limiter"
                value={ limit || defaultLimit }
                onChange={ ( event ) => setLimit(event.target.value) }>
                { options.map( (option, index) =>
                    <option key={ index } value={ option }>{ option !== 0 ? option : 'All' }</option>
                ) }
            </Styles.Elements.Field.Select> per page
        </Styles.Elements.Label>
    );
}

export default Limiter;
