import React from 'react';
import Styles from '../Styles';
import { SET_PAGE } from '../../actions';

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

const Pages = ({ page, total, action }) => {
    const setPage = ( page ) =>  action(SET_PAGE)({ page });
    return (
        <Styles.PaginationList>
            <Styles.Elements.Button
                onClick={ setPage.bind(this, 1) } disabled={ page == 1 } >First</Styles.Elements.Button>
            <Styles.Elements.Button
                onClick={ setPage.bind(this, page - 1) } disabled={ page < 2 } >Previous</Styles.Elements.Button>
            { getPages(page, total).map( (link, index) =>
                <Styles.Elements.Button
                    key={ index }
                    onClick={ setPage.bind(this, link) }
                    active={ page === link }
                    disabled={ page === link }
                >{ link }</Styles.Elements.Button>
            ) }
            <Styles.Elements.Button
                onClick={ setPage.bind(this, page + 1) } disabled={ page >= total }>Next</Styles.Elements.Button>
            <Styles.Elements.Button
                onClick={ setPage.bind(this, total) } disabled={ page == total }>Last</Styles.Elements.Button>
        </Styles.PaginationList>
    );
}

export default Pages
