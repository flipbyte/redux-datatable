import React from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { setPage } from '../actions';
import { prepareActionPayload } from '../utils'
import { withTableConfig } from '../TableProvider';
import Limiter from '../Table/Limiter';
import Styles from './Styles';

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

const lowerLimit = ( page, limit ) => ((page - 1) * limit) + 1;
const upperLimit = ( page, limit, count ) =>  (page * limit) > count ? count : page * limit;

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

const Pagination = ({
    config: { defaultLimit, showPagination = true, showNumberOfResults = true, showLimiter = true },
    query, setPage
}) => {
    const {
        page, start, end, count, limit, total
    } = calculatePaginationProps(query, defaultLimit);
    
    return <Styles.Pagination>
        { showLimiter &&
            <Styles.PaginationItem>
                <Limiter />
            </Styles.PaginationItem>
        }
        { showNumberOfResults &&
            <Styles.PaginationItem width="400px" textAlign="center">
                {!!count > 0 &&
                    <span>Showing { lowerLimit(page, limit) } to { upperLimit(page, limit, count) } of { count } entries</span>}
            </Styles.PaginationItem>
        }
        { showPagination &&
            <Styles.PaginationItem right>
                <Styles.PaginationList>
                    <Styles.PaginationListItem onClick={ setPage.bind(this, page - 1) } disabled={ page < 2 }>Previous</Styles.PaginationListItem>
                    <Styles.PaginationListItem onClick={ setPage.bind(this, 1) } disabled={ page == 1 }>First</Styles.PaginationListItem>
                    { getPages(page, total).map( (link, index) =>
                        <Styles.PaginationListItem
                            key={ index }
                            onClick={ setPage.bind(this, link) }
                            active={ page === link }
                            disabled={ page === link }
                        >{ link }</Styles.PaginationListItem>
                    ) }
                    <Styles.PaginationListItem onClick={ setPage.bind(this, total) } disabled={ page == total }>Last</Styles.PaginationListItem>
                    <Styles.PaginationListItem onClick={ setPage.bind(this, page + 1) } disabled={ page >= total }>Next</Styles.PaginationListItem>
                </Styles.PaginationList>
            </Styles.PaginationItem>
        }
    </Styles.Pagination>;
}

const mapStateToProps = ( state, { config: { reducerName, name } } ) => ({
    query: _.get(state, [reducerName, name, 'query'], {})
});

const mapDispatchToProps = ( dispatch, { config } ) => ({
    setPage: ( page ) => dispatch(setPage(prepareActionPayload(config)({ page }))),
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    defaultLimit: 'limiterConfig.default',
    routes: 'routes',
    entity: 'entity',
    showPagination: 'showPagination',
    showNumberOfResults: 'showNumberOfResults',
    showLimiter: 'showLimiter'
})(connect(mapStateToProps, mapDispatchToProps)(Pagination));
