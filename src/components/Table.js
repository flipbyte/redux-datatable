import React, { useContext } from 'react';
import { Table as StyledTable } from '../styled-components';
import ConfigContext from '../context';

const Table = ({ children }) => {
    const { config } = useContext(ConfigContext);
    const { styles = {} } = config.components.Table;
    return (
        <StyledTable className="rdt-table" styles={ styles.table }>
            { children }
        </StyledTable>
    );
};

export default Table;
