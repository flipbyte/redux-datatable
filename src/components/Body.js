import React, { useRef, useEffect } from 'react';
import { Loader, Tbody, Tr, Td, Div } from '../styled-components';
import { Body as Renderers } from './Renderer';
import { getStyles, getRenderer, prepareData, getExtraBodyRowProps, calculateWidth } from '../utils';
import { MODIFY_DATA } from '../actions';

const Body = ({
    columns,
    data = [],
    rowHeight,
    height,
    isFetching,
    scrollData: { top: startTop },
    setScrollData,
    overScanCount = 10,
    isPrinting = false,
    innerHeight,
    visibleHeight = 500,
    styles = {},
    schema,
    state,
    primaryKey,
    modified,
    tableWidth: { width = '100%', widthAdjustment = 1 },
    setTableWidth,
    bodyExtraData = {},
    action,
    thunk,
    isEditing,
    minWidth,
    loaderStyles = {},
}) => {
    let slicedData = [];
    let startIndex = 0;
    if (isPrinting === false) {
        const visibleLower =  startTop - overScanCount * rowHeight;
        const visibleUpper = startTop + visibleHeight + overScanCount * rowHeight;

        startIndex = Math.floor(visibleLower / rowHeight);
        if(startIndex < 0) {
            startIndex = 0;
        }

        const endIndex = Math.ceil(visibleUpper / rowHeight);
        slicedData = data.slice(startIndex, endIndex);
    } else {
        slicedData = data.slice(0)
    }

    const ref = useRef(null);
    const updateTableDimensions = () => {
        const tableBodyEl = ref.current;
        const computedTableWidth = minWidth > tableBodyEl.clientWidth || !tableBodyEl.clientWidth
            ? minWidth
            : tableBodyEl.clientWidth;

        const percentage = computedTableWidth / calculateWidth(columns);
        setTableWidth({
            width: calculateWidth(columns, percentage),
            widthAdjustment: percentage
        })
    }

    const handleScroll = () => (
        setScrollData({ pointerEvents: 'none', top: ref.current.scrollTop, left: -ref.current.scrollLeft })
    );

    useEffect(() => {
        updateTableDimensions();
        ref.current.addEventListener('scroll', handleScroll.bind(this), true);
        window.addEventListener('resize', updateTableDimensions);
        return () => {
            ref.current.addEventListener('scroll', handleScroll.bind(this), true);
            window.removeEventListener('resize', updateTableDimensions);
        };
    }, []);

    return (
        <Tbody
            styles={ getStyles(styles, 'tbody') }
            ref={ ref }
            isPrinting={ isPrinting }
            height={ height }
            visibleHeight={ visibleHeight }
            innerHeight={ innerHeight }
        >
            { isFetching && <Loader styles={ loaderStyles } /> }
            <div style={{ width, height: innerHeight, position: 'relative' }}>
                { slicedData.map((item, index) => {
                    const rowIndex = startIndex + index;
                    const top = rowIndex * rowHeight;
                    const data = prepareData(item, schema, state);
                    const primarKeyValue = _.get(data, primaryKey);
                    const modifiedData = modified[primarKeyValue] || {};
                    return (
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
                                const modifiedValue = _.get(modifiedData, name);
                                const origValue = _.get(data, name);
                                const value = modifiedValue || origValue;
                                return (
                                    <Td
                                        key={ index }
                                        className={ `rdt-table-col ${name} ${type}` }
                                        width={ width * widthAdjustment }
                                        styles={ getStyles(styles.td, 'body') }
                                    >
                                        <Div className="rdt-table-col-inner">
                                            <ColRenderer
                                                data={ data }
                                                value={ value }
                                                colConfig={ column }
                                                extraData={ bodyExtraData[name] }
                                                action={ action }
                                                thunk={ thunk }
                                                isEditing={ isEditing }
                                                origValue={ origValue }
                                                modifiedData={ modifiedData }
                                                isModified={ _.has(modifiedData, name) }
                                                modifiedValue={ modifiedValue }
                                                handleChange={(event) => {
                                                    var newData = { ...modifiedData };
                                                    _.set(newData, primaryKey, primarKeyValue);
                                                    _.set(newData, event.target.name, event.target.value);
                                                    action(MODIFY_DATA)({ key: primarKeyValue, value: newData })
                                                }}
                                            />
                                        </Div>
                                    </Td>
                                );
                            }}
                        </Tr>
                    );
                })}
            </div>
        </Tbody>
    );
}

Body.mapPropsToComponent = ({
    config: {
        rowHeight,
        height,
        primaryKey,
        components: {
            Loader = {},
            Table = {}
        }
    },
    tableData,
    printing: [ isPrinting ],
    editing: [ isEditing ],
    scroller: [ scrollData, setScrollData ],
    entity: { schema } = {},
    state,
    action,
    thunk,
    width: [ tableWidth, setTableWidth ],
    minWidth,
    visibleColumns
}) => {
    const { items: data, isFetching, modified } = tableData;
    const totalHeight = rowHeight * (data || []).length;
    const visibleHeight = height || totalHeight;

    return ({
        bodyExtraData: getExtraBodyRowProps(tableData, visibleColumns),
        columns: visibleColumns,
        data,
        rowHeight,
        scrollData,
        setScrollData,
        innerHeight: totalHeight,
        height: totalHeight > visibleHeight ? visibleHeight : totalHeight,
        visibleHeight: visibleHeight,
        isFetching,
        isPrinting,
        schema,
        state,
        primaryKey,
        modified,
        action,
        thunk,
        isEditing,
        setScrollData,
        setTableWidth,
        tableWidth,
        minWidth,
        loaderStyles: Loader.styles,
        styles: Table.styles
    });
}

export default Body;
