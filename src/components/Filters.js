import _ from 'lodash';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Tr, Td, Thead, Div } from '../styled-components';
import { getStyles, getRenderer } from '../utils';
import { Filters as Renderers } from './Renderer';
import { SET_FILTER } from '../actions';
import withScrollSpy from '../hoc/withScrollSpy';
import ConfigContext from '../context';

const Filters = React.forwardRef(({ children }, ref) => {
    const {
        columns,
        action,
        config: {
            components: {
                Table: { styles }
            }
        },
        getData
    } = useContext(ConfigContext);
    const search = useSelector(getData(tableData => tableData.query ? tableData.query.search : {}));
    const width = useSelector(getData(tableData => tableData.table ? tableData.table.width : 0));

    return (
        <Thead styles={ getStyles(styles, 'filters') } ref={ ref }>
            <div style={{ width }}>
                <Tr className="rdt-table-row" columns={ columns } styles={ getStyles(styles.tr, 'filters') }>
                    {(config, index) => {
                        const { filterable, type, ...rest } = config;
                        const { name } = rest;
                        const value = _.get(search, [ name, 'value' ]);
                        const Component = getRenderer(config, Renderers);
                        return (
                            <Td
                                key={ index }
                                colIndex={ index }
                                className={ `rdt-table-col filter ${name} ${type}` }
                                styles={ getStyles(styles.td, 'filters') }
                            >
                                { filterable && Component && (
                                    <Div>
                                        <Component
                                            name={ name }
                                            value={ value }
                                            filterer={(key, filter) => action(SET_FILTER)({ key, filter })}
                                            { ...rest }
                                        />
                                    </Div>
                                )}
                            </Td>
                        );
                    }}
                </Tr>
            </div>
        </Thead>
    );
});

Filters.displayName = 'Filters';

export default withScrollSpy(Filters);
