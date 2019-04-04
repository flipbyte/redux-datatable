import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles, getStyles } from '../utils';

const Row = styled.div `
    display: inline-block;
    width: 100%;
`

const ExtendedRow = styled(Row)(getExtendedStyles())

const Item = styled.div `
    display: block;
    width: auto;
    float: left;
`

const ExtendedItem = styled(Item)(getExtendedStyles())

const toolbarItem = ( children, item, index, styles ) => {
    const { visible } = item;
    return (
        <ExtendedItem key={ index } styles={ styles }>
            { visible !== false && children(item, index)  }
        </ExtendedItem>
    );
}

const Toolbar = ({
    className,
    items,
    children,
    styles: { item: itemStyles, row }
}) => (
    <div className={ className }>
        { items.map((row, rowIndex) => (
            <ExtendedRow key={ rowIndex } styles={ row }>
                { row.map((item, itemIndex) => (
                    toolbarItem(children, item, itemIndex, getStyles(itemStyles, item.name))
                )) }
            </ExtendedRow>
        ))}
    </div>
);

const StyledToolbar = styled(Toolbar) `
    display: block;
    width: 100%;
`;

const ExtendedStyledToolbar = styled(StyledToolbar)(getExtendedStyles('container'));

export default ExtendedStyledToolbar;
