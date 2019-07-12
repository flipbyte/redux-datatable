import React, { useContext } from 'react';
import { Table as StyledTable } from '../styled-components';

const Table = ({ children, config }) => {
    const { styles = {}, className = 'rdt-table' } = config;
    return (
        <StyledTable className={ className } styles={ styles.table }>
            { children }
        </StyledTable>
    );
};

export default Table;
