import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    font-family: ${props =>
        props.fontFamily ||
        `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
        sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
    };
`

export default Container;
