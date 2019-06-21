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
        action,
        config: {
            components: {
                Table: { styles }
            }
        },
        getData,
        getVisibleColumns
    } = useContext(ConfigContext);
    const { visibleColumnIds = [], query, width, widthAdjustment } = useSelector(
        getData(({ visibleColumnIds, query, table = {} }) => ({
            visibleColumnIds,
            query,
            width: table.width,
            widthAdjustment: table.widthAdjustment
        }))
    );
    const columns = getVisibleColumns(visibleColumnIds);
    return (
        <Thead styles={ getStyles(styles, 'filters') } ref={ ref }>
            <div style={{ width }}>
                <Tr className="rdt-table-row" columns={ columns } styles={ getStyles(styles.tr, 'filters') }>
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
});

export default withScrollSpy(Filters);
