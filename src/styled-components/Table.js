import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';

const Table = styled.div `
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
    background-color: transparent;
    border-collapse: collapse;
    clear: both;
    margin: 10px 0;
`;

const ExtendedTable = styled(Table)(getExtendedStyles());
export default ExtendedTable;
