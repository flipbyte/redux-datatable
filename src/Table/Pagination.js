import React from 'react';
import PropTypes from "prop-types";

/*const getTotalPages = ({ totalEntries, pageSize }) => Math.ceil((totalEntries / pageSize));

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
};*/

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

const Pagination = (props) => {
    /*!!totalEntries > 0 &&
        <ul className="pagination">
            <Pages currentPage={ props.currentPage }
                totalPages={ getTotalPages(props.totalEntries, props.pageSize) } />
        </ul>*/

    <ul className="pagination">
        <li className={"page-item " + (props.currentPage < 2) ? 'disabled': ''}>
            <a className="page-link" href="#" /*onClick={ setPage( props.currentPage - 1 ) }*/>Previous</a>
        </li>

        { getPages(props).map(function (link, index) {
            (props.currentPage != value) ?
                <li className={"page-item " + (link == props.currentPage) ? 'active' : ''}>
                    <a className="page-link" /*onClick={ setPage( link ) }*/>{ link }</a>
                </li>
        }) }

        <li className={"page-item " + (props.currentPage >= props.totalPages) ? 'disabled': ''}>
            <a className="page-link" href="#" /*onClick={ setPage( props.currentPage + 1 ) }*/>Next</a>
        </li>
    </ul>
};

Pagination.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired
}

// Pagination.propTypes = {
//     totalEntries: PropTypes.number.isRequired,
//     pageSize: PropTypes.number.isRequired,
//     currentPage: PropTypes.number,
//     displayConfig: PropTypes.shape({
//         previousLabel: PropTypes.string.isRequired,
//         nextLabel: PropTypes.string.isRequired,
//         firstLabel: PropTypes.string.isRequired,
//         lastLabel: PropTypes.string.isRequired,
//         onPageChange: PropTypes.func,
//         pageRange: PropTypes.number.isRequired
//     }),
// };
//
// Pagination.defaultProps = {
//     currentPage: 1,
//     showPerPage: 20,
//     displayConfig: {
//         previousLabel: 'Previous',
//         nextLabel: 'Next',
//         firstLabel: 'First',
//         lastLabel: 'Last',
//         pageRange: 2
//     }
// };

export default Pagination;
