import React from 'react';
import PropTypes from "prop-types";

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

const Pagination = ({
    name, url, start, end, page, total, count, limit, setPage
}) =>
    <div className="row">
        <div className="col-sm-12 col-md-6">
            {!!count > 0 &&
                <span>Showing { lowerLimit(page, limit) } to { upperLimit(page, limit, count) } of { count } entries</span>}
        </div>
        <div className="col-sm-12 col-md-6">
            <ul className="pagination justify-content-end">
                <li className={"page-item " + (page < 2 ? 'disabled': '')}>
                    <a className="page-link" href="#" onClick={ (event) => setPage( name, url, (page - 1) ) }>Previous</a>
                </li>

                { getPages(page, total).map( (link, index) =>
                    <li key={ index } className={"page-item " + (link == page ? 'active' : '')}>
                        <a className="page-link" href="#" onClick={ (event) => setPage( name, url, link ) }>{ link }</a>
                    </li>
                ) }

                <li className={"page-item " + (page >= total ? 'disabled': '')}>
                    <a className="page-link" href="#" onClick={ (event) => props.setPage( name, url, (page + 1) ) }>Next</a>
                </li>
            </ul>
        </div>
    </div>

Pagination.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    setPage: PropTypes.func
}

export default Pagination;
