import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
`

const Row = styled.div `
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
`
export default {
    Container,
    Row
}
