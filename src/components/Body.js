import _ from 'lodash';
import React, { useContext } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Loader as Spinner, Tbody, Tr, Td, Div } from '../styled-components';
import { Body as Renderers } from './Renderer';
import { getStyles, getRenderer } from '../utils';
import { MODIFY_DATA } from '../actions';
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
    // const data = useSelector(getData(tableData => tableData.items || []));
    const isPrinting = useSelector(getData(tableData => !!tableData.isPrinting));
    const isFetching = useSelector(getData(tableData => !!tableData.isFetching));
    const isEditing = useSelector(getData(tableData => !!tableData.isEditing));
    // const modified = useSelector(getData(tableData => tableData.modified));
    const width = useSelector(getData(tableData => tableData.table ? tableData.table.width : 0));
    const widthAdjustment = useSelector(getData(tableData => tableData.table ? tableData.table.widthAdjustment : 1));
    const visibleColumnIds = useSelector(getData(tableData => tableData.visibleColumnIds || []));
    const columns = getVisibleColumns(visibleColumnIds);

    // const state = useSelector(state => state);
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
                        // const modifiedValue = _.get(modifiedData, name);
                        // const origValue = _.get(data, name);
                        // const value = modifiedValue || origValue;
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

    // return (
    //     <Tbody
    //         styles={ getStyles(styles, 'tbody') }
    //         ref={ ref }
    //         isPrinting={ isPrinting }
    //         height={ height }
    //         visibleHeight={ visibleHeight }
    //         innerHeight={ innerHeight }
    //     >
    //         { !!isFetching && <Spinner styles={ Loader.styles || {} } /> }
    //         <div style={{ width, height: innerHeight, position: 'relative' }}>
    //             { slicedData.map((item, index) => {
    //                 const rowIndex = startIndex + index;
    //                 const top = rowIndex * rowHeight;
    //                 const data = prepareData(item, schema, state);
    //                 const primarKeyValue = _.get(data, primaryKey);
    //                 const modifiedData = modified[primarKeyValue] || {};
    //                 return (
    //                     <Tr
    //                         key={ rowIndex }
    //                         className="rdt-table-row"
    //                         position="absolute"
    //                         top={ top }
    //                         columns={ columns }
    //                         height={ rowHeight }
    //                         even={ rowIndex % 2 === 0 }
    //                         styles={ getStyles(styles.tr, 'body') }
    //                     >
    //                         {(column, index) => {
    //                             const { width, textAlign, name, type } = column;
    //                             const ColRenderer = getRenderer(column, Renderers);
    //                             const modifiedValue = _.get(modifiedData, name);
    //                             const origValue = _.get(data, name);
    //                             const value = modifiedValue || origValue;
    //                             return (
    //                                 <Td
    //                                     key={ index }
    //                                     className={ `rdt-table-col ${name} ${type}` }
    //                                     width={ width * widthAdjustment }
    //                                     styles={ getStyles(styles.td, 'body') }
    //                                 >
    //                                     <Div className="rdt-table-col-inner">
    //                                         <ColRenderer
    //                                             data={ data }
    //                                             value={ value }
    //                                             colConfig={ column }
    //                                             extraData={ bodyExtraData[name] }
    //                                             primaryKey={ primaryKey }
    //                                             action={ action }
    //                                             thunk={ thunk }
    //                                             isEditing={ isEditing }
    //                                             origValue={ origValue }
    //                                             modifiedData={ modifiedData }
    //                                             isModified={ _.has(modifiedData, name) }
    //                                             modifiedValue={ modifiedValue }
    //                                             handleChange={(event) => {
    //                                                 var newData = { ...modifiedData };
    //                                                 _.set(newData, primaryKey, primarKeyValue);
    //                                                 _.set(newData, event.target.name, event.target.value);
    //                                                 action(MODIFY_DATA)({ key: primarKeyValue, value: newData })
    //                                             }}
    //                                         />
    //                                     </Div>
    //                                 </Td>
    //                             );
    //                         }}
    //                     </Tr>
    //                 );
    //             })}
    //         </div>
    //     </Tbody>
    // );
});

export default withScrollSpy(Body);
