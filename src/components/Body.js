import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tbody, Tr, Td, Div, Row } from '../styled-components';
import { Body as Renderers } from './Renderer';
import { getStyles, getRenderer, getInitialVisibleColumns } from '../utils';
import { MODIFY_DATA, SET_BODY_INNER_WIDTH, SET_TABLE_WIDTH, SET_VISIBLE_COLUMN_IDS, SET_COLUMN_WIDTHS } from '../actions';
import { withScrollSpy } from '../hoc';
import ConfigContext from '../context';
import { createSelector } from 'reselect';

const addElementResizeEventListener = require('element-resize-event');
const removeElementResizeEventListener = require('element-resize-event').unbind;

const renderCol = (rowIndex, primaryKey, schema, styles, colClassName, column, index) => {
    const { textAlign, name, type } = column;
    const ColRenderer = getRenderer(column, Renderers);
    return (
        <Td
            key={ index }
            colIndex={ index }
            className={ `${colClassName} ${name} ${type}` }
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
    );
};

const renderRow = (
    columns,
    rowHeight,
    styles,
    primaryKey,
    schema,
    rowClassName,
    colClassName,
    noResultsMessage,
    rowIndex,
    top
) => (
    rowIndex !== -1
        ? (
            <Tr
                key={ rowIndex }
                className={ rowClassName }
                position="absolute"
                top={ top }
                columns={ columns }
                height={ rowHeight }
                even={ rowIndex % 2 === 0 }
                styles={ getStyles(styles.tr, 'body') }
            >
                { renderCol.bind(this, rowIndex, primaryKey, schema, styles, colClassName) }
            </Tr>
        ) : (
            <Row
                className={ rowClassName }
                height={ rowHeight + 'px' }
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }>
                { noResultsMessage }
            </Row>
        )
);

const Body = React.forwardRef(({ top: startTop = 0, config }, ref) => {
    const {
        columns,
        action,
        minWidth,
        getData,
        config: {
            name,
            rowHeight,
            height: minHeight,
            primaryKey,
            overScanCount = 10,
            noResultsMessage = 'No results found',
            components: {
                Table: { styles = {} }
            },
            entity: { schema } = {},
        }
    } = useContext(ConfigContext);

    const {
        className = 'table-body',
        rowClassName = 'rdt-table-row',
        colClassName = 'rdt-table-col'
    } = config;

    const itemCount = useSelector(getData(tableData => (tableData.items || []).length));
    const isPrinting = useSelector(getData(tableData => !!tableData.isPrinting));

    const updateTableDimensions = () => {
        action(SET_BODY_INNER_WIDTH)({
            clientWidth: ref.current ? ref.current.parentElement.clientWidth : minWidth,
        })
    };

    useEffect(() => {
        action(SET_VISIBLE_COLUMN_IDS)({ ids: getInitialVisibleColumns(columns) });
        action(SET_TABLE_WIDTH)({ width: minWidth, widthAdjustment: 1 });
        action(SET_COLUMN_WIDTHS)(columns.reduce((acc, column) => {
            if (column.visible !== false) {
                acc.push(column.width);
            }
            return acc;
        }, []));
    }, []);

    useEffect(() => {
        addElementResizeEventListener(ref.current, updateTableDimensions);
        return () => removeElementResizeEventListener(ref.current)
    }, []);

    useEffect(() => updateTableDimensions(), [ ref.current.clientWidth ]);

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
            endIndex = itemCount;
        }
        range[0] = startIndex;
        range[1] = endIndex;
    }

    return (
        <Tbody
            className={ className }
            styles={ getStyles(styles, 'tbody') }
            ref={ ref }
            isPrinting={ isPrinting }
            height={ height > 0 ? height : rowHeight }
            visibleHeight={ visibleHeight }
            innerHeight={ innerHeight > 0 ? innerHeight : rowHeight }
            range={ range }
            rowHeight={ rowHeight }
        >
            { renderRow.bind(
                this,
                columns,
                rowHeight,
                styles,
                primaryKey,
                schema,
                rowClassName,
                colClassName,
                noResultsMessage
            )}
        </Tbody>
    );
});

export default withScrollSpy(Body);
