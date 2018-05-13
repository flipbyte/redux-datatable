import React from 'react';
import PropTypes from "prop-types";

const NUM_LINKS = 5;

const fillRange = (start, end) => {
    return Array(end - start + 1).fill().map((item, index) => start + index);
};

const getPages = (props) => {
    var currentPage = props.page;
    var padding = Math.floor(NUM_LINKS / 2);
    var left = (currentPage - padding < padding) ? 1 : currentPage - padding;
    var right = (left + NUM_LINKS - 1 > props.total) ? props.total : left + NUM_LINKS - 1;

    left = (right == props.total) ?
        (right - NUM_LINKS < 1) ? 1 : right - NUM_LINKS + 1
        : left;

    return fillRange(left, right);
}

const Pagination = (props) =>
    <ul className="pagination">
        <li className={"page-item " + (props.page < 2 ? 'disabled': '')}>
            <a className="page-link" href="#" onClick={ (event) => props.setPage( props.name, props.url, (props.page - 1) ) }>Previous</a>
        </li>

        { getPages(props).map( (link, index) =>
            <li key={ index } className={"page-item " + (link == props.page ? 'active' : '')}>
                <a className="page-link" href="#" onClick={ (event) => props.setPage( props.name, props.url, link ) }>{ link }</a>
            </li>
        ) }

        <li className={"page-item " + (props.page >= props.total ? 'disabled': '')}>
            <a className="page-link" href="#" onClick={ (event) => props.setPage( props.name, props.url, (props.page + 1) ) }>Next</a>
        </li>
    </ul>

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
