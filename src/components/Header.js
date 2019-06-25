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

const Header = React.forwardRef(({ children }, ref) => {
    const {
        action,
        columns,
        config: {
            primaryKey,
            components: {
                Table: { styles }
            }
        },
        getData
    } = useContext(ConfigContext);

    const query = useSelector(getData(tableData => tableData.query || {}));
    const width = useSelector(getData(tableData => tableData.table ? tableData.table.width : 0));

    return (
        <Thead styles={ getStyles(styles, 'thead') } ref={ ref }>
            <div style={{ width }}>
                <Tr className="rdt-table-row" columns={ columns } styles={ getStyles(styles.tr, 'header') }>
                    {(config, index) => {
                        const { sortable, textAlign, name, type, ...rest } = config;
                        const { sort, dir } = query;
                        const Component = getRenderer(config, Renderers);
                        return (
                            <Th
                                key={ index }
                                colIndex={ index }
                                className={ `rdt-th ${name} ${type}` }
                                sortable={ sortable }
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

export default withScrollSpy(Header);
