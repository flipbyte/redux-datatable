import React from 'react';
import PropTypes from "prop-types";

const NUM_LINKS = 5;

const fillRange = (start, end) => {
    return Array(end - start + 1).fill().map((item, index) => start + index);
};

const getPages = (props) => {
    let last = NUM_LINKS
    last = props.total < last ? props.total : last

    let first = (props.page - Math.floor(last / 2))
    first = (first + last < props.total) ? first : props.total - last + 1;
    first = (first > 1) ? first : 1;

    return fillRange(first, last)
}

const Pagination = (props) =>
    <ul className="pagination">
        <li className={"page-item " + (props.page < 2 ? 'disabled': '')}>
            <a className="page-link" href="#" /*onClick={ setPage( props.currentPage - 1 ) }*/>Previous</a>
        </li>

        { getPages(props).map( (link, index) =>
            <li key={ index } className={"page-item " + (link == props.page ? 'active' : '')}>
                <a className="page-link" href="#" /*onClick={ setPage( link ) }*/>{ link }</a>
            </li>
        ) }

        <li className={"page-item " + (props.page >= props.total ? 'disabled': '')}>
            <a className="page-link" href="#" /*onClick={ setPage( props.currentPage + 1 ) }*/>Next</a>
        </li>
    </ul>

Pagination.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired
}

export default Pagination;
