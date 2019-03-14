import React from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { setPage } from '../actions';
import { prepareActionPayload } from '../utils'
import { withTableConfig } from '../TableProvider';
import Limiter from './Limiter';

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

    return <div className="col-sm-12 d-flex justify-content-between">
        { showLimiter &&
            <div>
                <Limiter />
            </div>
        }
        { showNumberOfResults &&
            <div className="p-2 align-self-center">
                {!!count > 0 &&
                    <span>Showing { lowerLimit(page, limit) } to { upperLimit(page, limit, count) } of { count } entries</span>}
            </div>
        }
        { showPagination &&
            <div>
                <ul className="pagination justify-content-end">
                    <li className={"page-item " + (page < 2 ? 'disabled': '')}>
                        <a className="page-link" href="#" onClick={ setPage.bind(this, page - 1) }>Previous</a>
                    </li>

                    { page != 1 && <li className={ "page-item " + (page == 1 ? 'disabled': '') }>
                        <a className="page-link" href="#" onClick={ setPage.bind(this, 1) }>First</a>
                    </li> }

                    { getPages(page, total).map( (link, index) =>
                        <li key={ index } className={ "page-item " + (link == page ? 'active' : '') }>
                            <a className="page-link" href="#" onClick={ setPage.bind(this, link) }>{ link }</a>
                        </li>
                    ) }

                    { total > 0 && page != total && <li className={ "page-item " + (page == total ? 'disabled': '') }>
                        <a className="page-link" href="#" onClick={ setPage.bind(this, total) }>Last</a>
                    </li> }

                    <li className={ "page-item " + (page >= total ? 'disabled': '') }>
                        <a className="page-link" href="#" onClick={ setPage.bind(this, page + 1) }>Next</a>
                    </li>
                </ul>
            </div>
        }
    </div>;
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
