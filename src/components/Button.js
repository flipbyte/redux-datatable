import React from 'react';
import { Button as StyledButton } from '../styled-components';

const Button = ({ config, thunk }) => {
    const { thunk: cb, label, name, styles = {} } = config;
    return (
        <StyledButton
            className={ `rdt-toolbar-btn ${name || ''}` }
            onClick={ cb && thunk.bind(this, cb, config) }
            styles={ styles }
        >
            { label }
        </StyledButton>
    );
};

Button.mapPropsToComponent = ({ thunk }) => ({ thunk });

export default Button;
