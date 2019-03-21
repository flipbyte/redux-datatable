import React from 'react';
import PropTypes from "prop-types";
import Styles from './Styles';
import Limiter, { TYPE_LIMITER } from './Pagination/Limiter';
import ResultCount from './Pagination/ResultCount';
import Pages from './Pagination/Pages';
import { calculatePaginationProps } from '../utils';

const renderers = {
    'limiter': Limiter,
    'pages': Pages,
    'resultCount': ResultCount,
}

const isVisible = (visible, position) => visible === true
    || (typeof visible === 'object'
        && (visible[position] === true || visible[position] === undefined));

const getRenderer = ( type ) => renderers[type];
const getLimiter = ( items ) => items.find(({ type }) => type === TYPE_LIMITER);
const Pagination = ({
    query,
    render,
    position,
    componentConfig: {
        items,
        visible = true
    }
}) => {
    const limiter = getLimiter(items);
    const defaultLimit = limiter.default || 10;
    const paginationProps = calculatePaginationProps(query, defaultLimit);
    return(
        isVisible(visible, position) && <Styles.Pagination>
            { items.map((item, index) => {
                const { visible: itemVisible, style, type } = item;
                return (
                    itemVisible && <Styles.PaginationItem key={ index } { ...style }>
                        { render(getRenderer(type), item, paginationProps, index) }
                    </Styles.PaginationItem>
                )
            })}
        </Styles.Pagination>
    )
}

export default Pagination;
