import React from 'react';
import { Table as StyledTable } from '../styled-components';

const Table = ({ children, styles = {} }) => (
    <StyledTable styles={ styles.table }>
        { children }
    </StyledTable>
);

Table.mapPropsToComponent = ({
    config: {
        components: {
            Table: { styles }
        }
    }
}) => ({ styles });

export default Table;
