import React from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { setPage } from '../actions';
import { prepareActionPayload } from '../utils'
import { withTableConfig } from '../TableProvider';
import Limiter from './Pagination/Limiter';
import ResultCount from './Pagination/ResultCount';
import Pages from './Pagination/Pages';
import Styles from './Styles';

const calculatePaginationProps = ( { page, limit = 0, count = 0 }, defaultLimit = 10 ) => {
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

const renderers = {
    limiter: Limiter,
    resultCount: ResultCount,
    pages: Pages
}

const PaginationItemRenderer = ({ type, ...rest }) => {
    const Renderer = renderer[type];
    return <Renderer { ...rest } />
}

const Pagination = ({
    query,
    setPage,
    defaultLimit,
    showPages = true,
    showResultCount = true,
    showLimiter = true,
    pagination
}) => {
    const {
        page, start, end, count, limit, total
    } = calculatePaginationProps(query, defaultLimit);

    pagination.map((item, index) =>
        <Styles.PaginationItem key={ index }>
            <PaginationItemRenderer { ...item } />
        </Styles.PaginationItem>
    )

    return <Styles.Pagination>
        { showLimiter &&
            <Styles.PaginationItem>
                <Limiter limit={ query.limit } />
            </Styles.PaginationItem>
        }
        { showResultCount &&
            <Styles.PaginationItem width="400px" textAlign="center">
                <ResultCount page={ page } limit={ limit } count={ count } />
            </Styles.PaginationItem>
        }
        { showPages &&
            <Styles.PaginationItem right>
                <Pages setPage={ setPage } page={ page } total={ total } />
            </Styles.PaginationItem>
        }
    </Styles.Pagination>;
}

export default Pagination;
