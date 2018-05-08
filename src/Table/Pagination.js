import React from 'react';
import PropTypes from "prop-types";

const getTotalPages = ({ totalEntries, pageSize }) => Math.ceil((totalEntries / pageSize));

const Pages = ({ currentPage, totalPages, displayConfig }) => {
    <li className="page-item"><a className="page-link" href="#">{ displayConfig.firstLabel }</a></li>

    {(currentPage != 1 && <li className="page-item"><a className="page-link" href="#">{ displayConfig.previousLabel }</a></li>)}

    {
        var start = (currentPage <= displayConfig.pageRange) ? 1 : (currentPage - displayConfig.pageRange);
        var last = ((currentPage - lastPage) <= displayConfig.pageRange); lastPage :
        last = (totalPages - currentPage) ? totalPages:
        Array.apply(start, Array(lastPage)).map(function (value, index) {
            (currentPage != index) ?
                <li className="page-item">
                    <a className="page-link" href="#">{ index }</a>
                </li> :
                <li className="page-item active">
                    <a className="page-link" href="#">{ index }</a>
                </li>
        })
    }

    {(currentPage != lastPage && <li className="page-item"><a className="page-link" href="#">{ displayConfig.nextLabel }</a></li>)}

    <li className="page-item"><a className="page-link" href="#">{ displayConfig.lastLabel }</a></li>
};

const Pagination = (props) => {
    !!totalEntries > 0 &&
        <ul className="pagination">
            <Pages currentPage={ props.currentPage }
                totalPages={ getTotalPages(props.totalEntries, props.pageSize) } />
        </ul>
};

Pagination.propTypes = {
    totalEntries: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    displayConfig: PropTypes.shape({
        previousLabel: PropTypes.string.isRequired,
        nextLabel: PropTypes.string.isRequired,
        firstLabel: PropTypes.string.isRequired,
        lastLabel: PropTypes.string.isRequired,
        onPageChange: PropTypes.func,
        pageRange: PropTypes.number.isRequired
    }),
};

Pagination.defaultProps = {
    currentPage: 1,
    showPerPage: 20,
    displayConfig: {
        previousLabel: 'Previous',
        nextLabel: 'Next',
        firstLabel: 'First',
        lastLabel: 'Last',
        pageRange: 2
    }
};

export default Pagination;
