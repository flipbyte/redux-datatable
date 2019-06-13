import React from 'react';
import { Tr, Td, Thead, ExtendedDiv } from '../styled-components';
import { getStyles, getRenderer } from '../utils';
import { Filters as Renderers } from './Renderer';
import { SET_FILTER } from '../actions';

const Filters = ({
    columns,
    action,
    query = {},
    children,
    scrollData: { left },
    tableWidth: { width = '100%', widthAdjustment = 1 }
}) => (
    <Thead>
        <div style={{ width }}>
            <Tr className="rdt-table-row" columns={ columns } left={ left }>
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
                        >
                            { filterable && Component && (
                                <ExtendedDiv>
                                    <Component
                                        name={ name }
                                        value={ value }
                                        filterer={(key, filter) => action(SET_FILTER)({ key, filter })}
                                        { ...rest }
                                    />
                                </ExtendedDiv>
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
    scroller: [ scrollData ]
}) => ({ columns: visibleColumns, action, query, tableWidth, scrollData });

export default Filters;
