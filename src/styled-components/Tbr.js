import React, { useContext } from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';
import { prepareData } from '../utils';
import { useSelector, shallowEqual } from 'react-redux';
import ConfigContext from '../context';
import { createSelector } from 'reselect';

const Tbr = ({ className, children, style, columns, itemIndex }) => {
    const {
        getData,
        getState,
        reducerName,
        config: {
            name,
            primaryKey,
            entity = {}
        }
    } = useContext(ConfigContext);

    const getItem = getData(tableData => {
        return tableData.items && tableData.items[itemIndex]
    });
    const data = useSelector(createSelector(
        [ getState, getItem ],
        ( state, item ) => {
            return item ? prepareData(item, entity.schema, state) : {};
        }
    ), shallowEqual);

    const modified = useSelector(getData(tableData => tableData.modified || {}));
    const primarKeyValue = _.get(data, primaryKey);
    const modifiedData = modified[primarKeyValue] || {};


    // const { width, textAlign, name, type } = column;
    // const ColRenderer = getRenderer(column, Renderers);
    // const modifiedValue = _.get(modifiedData, name);
    // const origValue = _.get(data, name);
    // const value = modifiedValue || origValue;
    //
    return (
        <div className={ className } style={ style }>
            { columns.map((column, index) => (
                children(column, data, index, modifiedData)
            ))}
        </div>
    );
}

const StyledTbr = styled(Tbr).attrs(({ top }) => ({
    style: { top }
})) `
    display: flex;
    width: 100%;
    padding: 0;
    height: auto;
    position: relative;
    background: none;
    position: ${props => props.position || 'relative'};
`;
const ExtendedStyledTbr = styled(StyledTbr)(getExtendedStyles());
export default ExtendedStyledTbr;
