import React from 'react';
import { Tr, Th, Thead } from '../styled-components';
import { getStyles, getRenderer } from '../utils';
import { Header as Renderers } from './Renderer';
import { SET_SORT } from '../actions';

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

const Header = ({
    columns,
    action,
    query = {},
    selection,
    children,
    scrollData: { left },
    styles = {},
    tableWidth: { width = '100%', widthAdjustment = 1 }
}) => (
    <Thead styles={ getStyles(styles, 'thead') }>
        <div style={{ width }}>
            <Tr className="rdt-table-row" columns={ columns } left={ left }  styles={ getStyles(styles.tr, 'header') }>
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

Header.mapPropsToComponent = ({
    visibleColumns,
    action,
    tableData: { query, selection },
    width: [ tableWidth ],
    scroller: [ scrollData ],
    config: {
        components: {
            Table: { styles }
        }
    }
}) => ({ columns: visibleColumns, action, query, tableWidth, scrollData, selection, styles });

export default Header;
