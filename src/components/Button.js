import React from 'react';
import { Button as StyledButton } from '../styled-components';

const Button = (props) => {
    const { config, thunk } = props;
    const { thunk: cb, label, name } = config;
    return (
        <StyledButton
            className={ `rdt-toolbar-btn ${name || ''}` }
            onClick={ cb && thunk.bind(this, cb, config) }
        >
            { label }
        </StyledButton>
    );
};

Button.mapPropsToComponent = ({ thunk }) => ({ thunk });

export default Button;
