import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles, getStyles } from '../utils';

const Item = styled.div `
    display: flex;
    min-width: 200px;
    float: left;
    text-align: left;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`

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
    page = page > 1 ? page : 1
    limit = limit != 0 ? limit : defaultLimit;

    let start = (page - 1) * limit
    let end = start + limit - 1

    return {
        page: page,
        start: start,
        end: (count > end && end >= 0) ? end : count,
        count: count,
        limit: limit,
        total: Math.ceil(count / limit)
    }
}

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
                const { visible: itemVisible, style, type } = items[key];
                return (
                    itemVisible && <ExtendedItem key={ index } styles={ getStyles(item, type) }>
                        { children(items[key], paginationProps, index) }
                    </ExtendedItem>
                )
            })}
        </div>
    )
}

const StyledPagination = styled(Pagination) `
    display: block;
    width: 100%;
`

const ExtendedStyledPagination = styled(StyledPagination)(getExtendedStyles('container'));

export default ExtendedStyledPagination;
