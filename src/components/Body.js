import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Loader as Spinner, Tbody, Tr, Td, Div } from '../styled-components';
import { Body as Renderers } from './Renderer';
import { getStyles, getRenderer, calculateWidth } from '../utils';
import { MODIFY_DATA, SET_TABLE_WIDTH } from '../actions';
import withScrollSpy from '../hoc/withScrollSpy';
import ConfigContext from '../context';
import { createSelector } from 'reselect';

const Body = React.forwardRef(({ top: startTop = 0 }, ref) => {
    const {
        action,
        thunk,
        minWidth,
        reducerName,
        getData,
        getVisibleColumns,
        config: {
            name,
            rowHeight,
            height: minHeight,
            primaryKey,
            overScanCount = 10,
            components: {
                Loader = {},
                Table: { styles = {} }
            },
            entity: { schema } = {},
        }
    } = useContext(ConfigContext);

    const itemCount = useSelector(getData(tableData => (tableData.items || []).length));
    const isPrinting = useSelector(getData(tableData => !!tableData.isPrinting));
    const width = useSelector(getData(tableData => tableData.table ? tableData.table.width : 0));
    const widthAdjustment = useSelector(getData(tableData => tableData.table ? tableData.table.widthAdjustment : 1));
    const visibleColumnIds = useSelector(
        getData(tableData => tableData.visibleColumnIds || []),
        (nextState, prevState) => nextState.length === prevState.length
    );
    const columns = getVisibleColumns(visibleColumnIds);

    const updateTableDimensions = () => {
        const tableBodyEl = ref.current;
        const computedTableWidth = minWidth > tableBodyEl.clientWidth || !tableBodyEl.clientWidth
            ? minWidth
            : tableBodyEl.clientWidth;

        const percentage = computedTableWidth / calculateWidth(columns);
        action(SET_TABLE_WIDTH)({
            width: calculateWidth(columns, percentage),
            widthAdjustment: percentage
        })
    }

    useEffect(() => {
        // window.removeEventListener('resize', updateTableDimensions);
        window.addEventListener('resize', updateTableDimensions);

        return () => window.removeEventListener('resize', updateTableDimensions)
    }, [ updateTableDimensions ]);

    useEffect(() => updateTableDimensions(), [ ref.current, visibleColumnIds.length ]);

    const totalHeight = rowHeight * itemCount;
    const visibleHeight = minHeight || totalHeight;
    const innerHeight = totalHeight;
    const height = totalHeight > visibleHeight ? visibleHeight : totalHeight;

    var range = [ 0, itemCount ];
    if (isPrinting === false) {
        const visibleLower = startTop - overScanCount * rowHeight;
        const visibleUpper = startTop + visibleHeight + overScanCount * rowHeight;

        let startIndex = Math.floor(visibleLower / rowHeight);
        if (startIndex < 0) {
            startIndex = 0;
        }

        let endIndex = Math.ceil(visibleUpper / rowHeight);
        if (endIndex > itemCount) {
            endIndex = itemCount
        }
        range[0] = startIndex;
        range[1] = endIndex;
    }

    return (
        <Tbody
            styles={ getStyles(styles, 'tbody') }
            ref={ ref }
            isPrinting={ isPrinting }
            height={ height }
            visibleHeight={ visibleHeight }
            innerHeight={ innerHeight }
            range={ range }
            width={ width }
            rowHeight={ rowHeight }
        >
            {(rowIndex, top) => (
                <Tr
                    key={ rowIndex }
                    className="rdt-table-row"
                    position="absolute"
                    top={ top }
                    columns={ columns }
                    height={ rowHeight }
                    even={ rowIndex % 2 === 0 }
                    styles={ getStyles(styles.tr, 'body') }
                >
                    {(column, index) => {
                        const { width, textAlign, name, type } = column;
                        const ColRenderer = getRenderer(column, Renderers);
                        return (
                            <Td
                                key={ index }
                                className={ `rdt-table-col ${name} ${type}` }
                                width={ width * widthAdjustment }
                                styles={ getStyles(styles.td, 'body') }
                            >
                                <Div className="rdt-table-col-inner">
                                    <ColRenderer
                                        itemIndex={ rowIndex }
                                        colConfig={ column }
                                        primaryKey={ primaryKey }
                                        schema={ schema }
                                    />
                                </Div>
                            </Td>
                        )
                    }}
                </Tr>
            )}
        </Tbody>
    )
});

export default withScrollSpy(Body);
