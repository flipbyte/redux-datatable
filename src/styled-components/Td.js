import React, { useContext } from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';
import ConfigContext from '../context';
import { useSelector } from 'react-redux';

const Td = ({ className, style, children, colIndex, onClick }) => {
    const { getData } = useContext(ConfigContext);
    const isVisible = useSelector(getData(({ visibleColumnIds }) => (
        visibleColumnIds ? visibleColumnIds.indexOf(colIndex) !== -1 : true
    )));
    const width = useSelector(getData(({ visibleColumnIds, columnWidths, table }) => (
        table ? columnWidths[visibleColumnIds.indexOf(colIndex)] * table.widthAdjustment : 0
    )));

    return isVisible && (
        <div className={ className } style={{ maxWidth: width }} onClick={ onClick && onClick }>
            { children }
        </div>
    );
};

const StyledTd = styled(Td).attrs(({ width: maxWidth }) => ({
    style: { maxWidth }
})) `
    flex-direction: column;
    justify-content: center;
    flex: 1;
    display: flex;
    padding: 10px 5px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    width: 100%;
    position: relative;
    overflow: hidden;
    font-size: 14px;

    &:empty {
        padding: 0 5px;
    }
`;

const ExtendedTd = styled(StyledTd)(getExtendedStyles());
export default ExtendedTd;
