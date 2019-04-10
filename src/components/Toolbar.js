import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles, getStyles } from '../utils';

const Row = styled.div `
    display: inline-block;
    width: 100%;
`;
const ExtendedRow = styled(Row)(getExtendedStyles());

const Item = styled.div `
    display: block;
    width: auto;
    float: left;
`;
const ExtendedItem = styled(Item)(getExtendedStyles());

const toolbarItem = ( children, item, index, first, last, styles ) => {
    const { visible } = item;
    return (
        <ExtendedItem key={ index } first={ first } laststyles={ styles }>
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
            <ExtendedRow
                key={ rowIndex }
                index={ rowIndex }
                first={ rowIndex === 0 }
                last={ rowIndex === items.length - 1 }
                styles={ row }
            >
                { row.map((item, itemIndex) => (
                    <ExtendedItem
                        key={ itemIndex }
                        index={ itemIndex }
                        first={ itemIndex === 0 }
                        last={ itemIndex === row.length - 1 }
                        styles={ getStyles(itemStyles, item.name) }
                    >
                        { item.visible !== false && children(item, itemIndex)  }
                    </ExtendedItem>
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
