import React, { useContext } from 'react';
import { Table as StyledTable } from '../styled-components';
import ConfigContext from '../context';

const Table = ({ children }) => {
    const {
        config: {
            components: {
                Table: { styles }
            }
        }
    } = useContext(ConfigContext);
    return (
        <StyledTable styles={ styles.table }>
            { children }
        </StyledTable>
    );
}

// Table.mapPropsToComponent = ({
//     config: {
//         components: {
//             Table: { styles }
//         }
//     }
// }) => ({ styles });

export default Table;
