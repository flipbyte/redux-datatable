import React from 'react';
import StyledButton from '../../components/Button';

const Button = ({ itemConfig, thunk }) => (
    <StyledButton onClick={ itemConfig.thunk && thunk.bind(this, itemConfig.thunk, itemConfig)  }>
        { itemConfig.label }
    </StyledButton>
);

export default Button;
