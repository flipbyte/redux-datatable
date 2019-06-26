import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { SET_PAGE } from '../actions';
import styled from 'styled-components';
import { Button } from '../styled-components';
import { getExtendedStyles, calculatePaginationProps } from '../utils';
import ConfigContext from '../context';

export const List = styled.div `
    display: inline-flex;
    vertical-align: middle;
    background: ${props => props.background || '#fff'};
    border: ${props => props.border || '1px solid rgba(34,36,38,.15)'};
    border-radius: ${props => props.borderRadius || 'none'};
    height: ${props => props.height || '40px'};
`;
const ExtendedList = styled(List)(getExtendedStyles());

const NUM_LINKS = 5;
const fillRange = ( start, end ) => {
    return Array(end - start + 1).fill().map((item, index) => start + index);
};

const getPages = ( currentPage = 1, total = 0 ) => {
    var padding = Math.floor(NUM_LINKS / 2);
    var left = (currentPage - padding < padding) ? 1 : currentPage - padding;
    var right = (left + NUM_LINKS - 1 > total) ? total : left + NUM_LINKS - 1;

    left = (right === total) ?
        (right - NUM_LINKS < 1) ? 1 : right - NUM_LINKS + 1
        : left;

    return fillRange(left, right);
};

const Pages = ({
    config: {
        styles = {}
    }
}) => {
    const {
        action,
        getData,
        defaultLimit,
        config: { reducerName, name }
    } = useContext(ConfigContext);
    const query = useSelector(getData((tableData) => tableData.query));
    const { page, total } = calculatePaginationProps(query, defaultLimit);
    const setPage = ( page ) => action(SET_PAGE)({ page });
    return (
        <ExtendedList className="rdt-pg-list" styles={ styles.list }>
            <Button
                className="rdt-pg-first"
                onClick={() => setPage(1)}
                disabled={ page === 1 }
                styles={ styles.first }
            >
                First
            </Button>
            <Button
                className="rdt-pg-prev"
                onClick={() => setPage(page - 1)}
                disabled={ page < 2 }
                styles={ styles.previous }
            >
                Previous
            </Button>
            { getPages(page, total).map( (link, index) =>
                <Button
                    key={ index }
                    className={ `rdt-pg-num ${page === link ? 'active' : ''}` }
                    onClick={() => setPage(link)}
                    active={ page === link }
                     styles={ styles.pageNumber }
                >{ link }</Button>
            ) }
            <Button
                className="rdt-pg-next"
                onClick={() => setPage(page + 1)}
                disabled={ page >= total }
                styles={ styles.next }
            >
                Next
            </Button>
            <Button
                className="rdt-pg-last"
                onClick={() => setPage(total)}
                disabled={ total === 0 || page === total }
                styles={ styles.last }
            >
                Last
            </Button>
        </ExtendedList>
    );
};

export default Pages;
