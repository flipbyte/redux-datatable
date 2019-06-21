import _ from 'lodash';
import React, { useRef, useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader as Spinner, Tbody, Tr, Td, Div } from '../styled-components';
import { Body as Renderers } from './Renderer';
import { getStyles, getRenderer, prepareData, getExtraBodyRowProps } from '../utils';
import { MODIFY_DATA } from '../actions';
import withScrollSpy from '../hoc/withScrollSpy';
import ConfigContext from '../context';

const Body = React.forwardRef(({ top: startTop = 0 }, ref) => {
    const {
        action,
        thunk,
        minWidth,
        getData,
        getVisibleColumns,
        config: {
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

    const {
        data = [], isFetching, isEditing, isPrinting, modified, width, widthAdjustment, visibleColumnIds, columns, bodyExtraData
    } = useSelector(getData(tableData => {
        const {
            items: data,
            isFetching,
            isEditing,
            modified,
            isPrinting,
            table = {},
            visibleColumnIds = []
        } = tableData;
        const columns = getVisibleColumns(visibleColumnIds);
        return {
            data,
            isFetching,
            isEditing,
            isPrinting,
            modified,
            width: table.width,
            widthAdjustment: table.widthAdjustment,
            columns,
            bodyExtraData: getExtraBodyRowProps(tableData, columns)
        }
    }));

    const state = useSelector(state => state);
    const totalHeight = rowHeight * (data || []).length;
    const visibleHeight = minHeight || totalHeight;
    const innerHeight = totalHeight;
    const height = totalHeight > visibleHeight ? visibleHeight : totalHeight;

    let slicedData = [];
    let startIndex = 0;
    if (isPrinting === false) {
        const visibleLower = startTop - overScanCount * rowHeight;
        const visibleUpper = startTop + visibleHeight + overScanCount * rowHeight;

        startIndex = Math.floor(visibleLower / rowHeight);
        if (startIndex < 0) {
            startIndex = 0;
        }

        const endIndex = Math.ceil(visibleUpper / rowHeight);
        slicedData = data.slice(startIndex, endIndex);
    } else {
        slicedData = data.slice(0)
    }

    return (
        <Tbody
            styles={ getStyles(styles, 'tbody') }
            ref={ ref }
            isPrinting={ isPrinting }
            height={ height }
            visibleHeight={ visibleHeight }
            innerHeight={ innerHeight }
        >
            { !!isFetching && <Spinner styles={ Loader.styles || {} } /> }
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
                                                primaryKey={ primaryKey }
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
});

export default withScrollSpy(Body);
