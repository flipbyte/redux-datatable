import React from 'react';
import styled, { css } from 'styled-components';
import { getExtendedStyles, getStyles } from '../utils';

const Item = styled.div `
    display: flex;
    min-width: auto;
    float: ${props => props.right ? 'right' : 'left'};
    text-align: left;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 10px;

    ${props => props.first && css `
        margin-left: 0;
    `};
`;

const ExtendedItem = styled(Item)(getExtendedStyles());

const isVisible = (visible, position) => (
    visible === true || (
        typeof visible === 'object' && (
            visible[position] === true || visible[position] === undefined
        )
    )
);

export const calculatePaginationProps = (
    { page, limit = 0, count = 0 },
    defaultLimit = 10
) => {
    page = page > 1 ? page : 1;
    limit = limit !== 0 ? limit : defaultLimit;

    let start = (page - 1) * limit;
    let end = start + limit - 1;

    return {
        page,
        start,
        end: (count > end && end >= 0) ? end : count,
        count,
        limit,
        total: Math.ceil(count / limit)
    };
};

const Pagination = ({
    children,
    className,
    config: { items = {}, visible = true },
    margin,
    position,
    query = {},
    styles: { item }
}) => {
    const defaultLimit = items.limiter.default || 10;
    const paginationProps = calculatePaginationProps(query, defaultLimit);
    return(
        isVisible(visible, position) && <div className={ className }>
            { Object.keys(items).map((key, index) => {
                const { visible: itemVisible, type, right } = items[key];
                return (
                    itemVisible && <ExtendedItem
                        key={ index }
                        index={ index }
                        first={ index === 0 }
                        last={ index === items.length - 1 }
                        right={ right }
                        styles={ getStyles(item, type) }
                    >
                        { children(items[key], paginationProps, index) }
                    </ExtendedItem>
                );
            })}
        </div>
    );
};

const StyledPagination = styled(Pagination) `
    display: block;
    width: 100%;
`;
const ExtendedStyledPagination = styled(StyledPagination)(getExtendedStyles('container'));
export default ExtendedStyledPagination;
