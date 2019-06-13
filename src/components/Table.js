import React from 'react';
import { Table as StyledTable } from '../styled-components';

const Table = ({ children }) => (
    <StyledTable>
        { children }
    </StyledTable>
);

Table.mapPropsToComponent = () => ({});

export default Table;
