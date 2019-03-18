import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div `
    position: relative;
    display: block;
    width: 100%;
    overflow: auto;
    border: 0;
`

const Table = styled.div `
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
    background-color: transparent;
    border-collapse: collapse;
`

export default Table;
