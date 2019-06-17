import _ from 'lodash';
import React from 'react';
import { Tr, Td, Thead, Div } from '../styled-components';
import { getStyles, getRenderer } from '../utils';
import { Filters as Renderers } from './Renderer';
import { SET_FILTER } from '../actions';

const Filters = ({
    columns,
    action,
    query = {},
    children,
    styles = {},
    scrollData: { left },
    tableWidth: { width = '100%', widthAdjustment = 1 }
}) => (
    <Thead styles={ getStyles(styles, 'filters') }>
        <div style={{ width }}>
            <Tr className="rdt-table-row" columns={ columns } left={ left } styles={ getStyles(styles.tr, 'filters') }>
                {(config, index) => {
                    const { filterable, type, width, ...rest } = config;
                    const { name } = rest;
                    const value = _.get(query, ['search', name, 'value']);
                    const Component = getRenderer(config, Renderers);
                    return (
                        <Td
                            key={ index }
                            className={ `rdt-table-col filter ${name} ${type}` }
                            width={ width * widthAdjustment }
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

Filters.mapPropsToComponent = ({
    visibleColumns,
    action,
    tableData: { query },
    width: [ tableWidth ],
    scroller: [ scrollData ],
    config: {
        components: {
            Table: { styles }
        }
    }
}) => ({ columns: visibleColumns, action, query, tableWidth, scrollData, styles });

export default Filters;
