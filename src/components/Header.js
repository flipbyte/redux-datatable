import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Tr, Th, Thead } from '../styled-components';
import { getStyles, getRenderer } from '../utils';
import { Header as Renderers } from './Renderer';
import { SET_SORT } from '../actions';
import withScrollSpy from '../hoc/withScrollSpy';
import ConfigContext from '../context';

const changeSortOrder = ( query, colName, sorter ) => {
    let dir = null;
    if ( query.sort !== colName ) {
        dir = 'asc';
    } else {
        if (query.dir === 'asc') {
            dir = 'desc';
        } else if (query.dir === 'desc') {
            colName = '';
            dir = '';
        } else {
            dir = 'asc';
        }
    }

    sorter({ sort: colName, dir });
};

const Header = React.forwardRef(({
    // columns,
    // action,
    // query = {},
    // selection,
    children,
    // styles = {},
    // primaryKey,
    // tableWidth: { width = '100%', widthAdjustment = 1 }
}, ref) => {
    const {
        action,
        config: {
            primaryKey,
            components: {
                Table: { styles }
            }
        },
        getData,
        getVisibleColumns
    } = useContext(ConfigContext);
    // const tableData = useSelector(getData(tableData => {
    //     return tableData;
    // }))
    const { visibleColumnIds, query, selection, width, widthAdjustment } = useSelector(
        getData(({ visibleColumnIds = [], query, selection, table = {} }) => ({
            visibleColumnIds,
            query,
            selection,
            width: table.width,
            widthAdjustment: table.widthAdjustment
        }))
    );
    const columns = getVisibleColumns(visibleColumnIds);
    return (
        <Thead styles={ getStyles(styles, 'thead') } ref={ ref }>
            <div style={{ width }}>
                <Tr className="rdt-table-row" columns={ columns } styles={ getStyles(styles.tr, 'header') }>
                    {(config, index) => {
                        const { sortable, width, textAlign, name, type, ...rest } = config;
                        const { sort, dir } = query;
                        const Component = getRenderer(config, Renderers);
                        return (
                            <Th
                                key={ index }
                                className={ `rdt-th ${name} ${type}` }
                                sortable={ sortable }
                                width={ width * widthAdjustment }
                                textAlign={ textAlign }
                                styles={ styles.th }
                                onClick={ sortable ? changeSortOrder.bind(this, query, name, action(SET_SORT)) : null }
                            >
                                { Component && (
                                    <Component
                                        name={ name }
                                        sortable={ sortable }
                                        sort={ sort }
                                        dir={ dir }
                                        selection={ selection }
                                        primaryKey={ primaryKey }
                                        action={ action }
                                        { ...rest }
                                    />
                                )}
                            </Th>
                        );
                    }}
                </Tr>
            </div>
        </Thead>
    );
});

// Header.mapPropsToComponent = ({
//     visibleColumns,
//     action,
//     tableData: { query, selection },
//     width: [ tableWidth ],
//     config: {
//         primaryKey,
//         components: {
//             Table: { styles }
//         }
//     }
// }) => ({ columns: visibleColumns, action, query, tableWidth, selection, styles, primaryKey });

export default withScrollSpy(Header);
