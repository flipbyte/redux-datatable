import React from 'react';
import StyledButton from '../../components/Button';

const Button = ({ itemConfig, thunk }) => {
    const { thunk: cb, label, name } = itemConfig;
    return (
        <StyledButton
            className={ `rdt-toolbar-btn ${name || ''}` }
            onClick={ cb && thunk.bind(this, cb, itemConfig) }
        >
            { label }
        </StyledButton>
    );
};

export default Button;
