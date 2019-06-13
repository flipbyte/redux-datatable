import React from 'react';
import withScrollSpy from '../hoc/withScrollSpy';
import { Loader, Tbody, Tr, Td, ExtendedDiv } from '../styled-components';
import { Body as Renderers } from './Renderer';
import { getStyles, getRenderer, prepareData, getExtraBodyRowProps } from '../utils';

const Body = withScrollSpy(
    React.forwardRef(({
        columns,
        data = [],
        rowHeight,
        height,
        isFetching,
        scrollData: { top: startTop },
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
        bodyExtraData = {},
        action,
        thunk,
        isEditing
    }, ref) => {
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

        return (
            <Tbody
                styles={ styles }
                ref={ ref }
                isPrinting={ isPrinting }
                height={ height }
                visibleHeight={ visibleHeight }
                innerHeight={ innerHeight }
            >
                { isFetching && <Loader /> }
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
                                            width={ `${width * widthAdjustment}px` }
                                        >
                                            <ExtendedDiv className="rdt-table-col-inner">
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
                                            </ExtendedDiv>
                                        </Td>
                                    );
                                }}
                            </Tr>
                        );
                    })}
                </div>
            </Tbody>
        );
    })
);

Body.mapPropsToComponent = ({
    config: { rowHeight, height, primaryKey },
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
        minWidth
    });
}

export default Body;
