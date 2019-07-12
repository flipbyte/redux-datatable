import React, { useContext } from 'react';
import { Button as StyledButton } from '../styled-components';
import ConfigContext from '../context';

const Button = ({ config }) => {
    const { thunk } = useContext(ConfigContext);
    const { thunk: cb, label, name, styles = {}, className = 'rdt-toolbar-btn' } = config;
    return (
        <StyledButton
            className={ className }
            onClick={ cb && thunk.bind(this, cb, config) }
            styles={ styles }
        >
            { label }
        </StyledButton>
    );
};

export default Button;
