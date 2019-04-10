import React from 'react';
import { SET_PAGE } from '../../actions';
import styled from 'styled-components';
import Button from '../../components/Button';

export const List = styled.div `
    display: inline-flex;
    vertical-align: middle;
    background: ${props => props.background || '#fff'};
    border: ${props => props.border || '1px solid rgba(34,36,38,.15)'};
    border-radius: ${props => props.borderRadius || 'none'};
    height: ${props => props.height || '40px'}
`

const NUM_LINKS = 5;

const fillRange = ( start, end ) => {
    return Array(end - start + 1).fill().map((item, index) => start + index);
};

const getPages = ( currentPage, total ) => {
    var padding = Math.floor(NUM_LINKS / 2);
    var left = (currentPage - padding < padding) ? 1 : currentPage - padding;
    var right = (left + NUM_LINKS - 1 > total) ? total : left + NUM_LINKS - 1;

    left = (right == total) ?
        (right - NUM_LINKS < 1) ? 1 : right - NUM_LINKS + 1
        : left;

    return fillRange(left, right);
}

const Pages = ({ page, total, action, style }) => {
    const setPage = ( page ) =>  action(SET_PAGE)({ page });
    return (
        <List>
            <Button onClick={ setPage.bind(this, 1) } disabled={ page === 1 }>First</Button>
            <Button onClick={ setPage.bind(this, page - 1) } disabled={ page < 2 } >Previous</Button>
            { getPages(page, total).map( (link, index) =>
                <Button
                    key={ index }
                    onClick={ setPage.bind(this, link) }
                    active={ page === link }
                >{ link }</Button>
            ) }
            <Button onClick={ setPage.bind(this, page + 1) } disabled={ page >= total }>Next</Button>
            <Button onClick={ setPage.bind(this, total) } disabled={ page === total }>Last</Button>
        </List>
    );
}

export default Pages
