import React from 'react';
import PropTypes from "prop-types";
import Header from './Table/Header';
import Body from './Table/Body';
import Pagination from './Table/Pagination';
import Limiter from './Table/Limiter';

const MIN_LIMIT = 20;

const calculatePaginationProps = (page, limit, count) => {
    page = page > 1 ? page : 1
    limit = limit > MIN_LIMIT ? limit : MIN_LIMIT

    let start = (page - 1) * limit
    let end = start + limit - 1

    return {
        page: page,
        start: start,
        end: (count > end) ? end : count,
        count: count,
        limit: limit,
        total: Math.ceil(count / limit)
    }
}

const Table = ( props ) =>
    <div className="animated fadeIn">
        <div className="row">
            <div className="col-12">
                <div className="card">
                {!!props.title  &&
                    <div className="card-header">
                        <i className="fa fa-align-justify"></i> { props.title }
                    </div>}
                    <div className="card-block">
                        <div className="row">
                            <div className="col-sm-12 col-md-3">
                                <Limiter
                                    name={ props.name }
                                    url={ props.url }
                                    setLimit={ props.setLimit }
                                    options={ props.limiterOptions } />
                            </div>
                        </div>

                        <div id={ props.name } className="flutter-table-container table-responsive">
                            <table className="table table-sm table-hover flutter-table">
                                <Header
                                    name={ props.name }
                                    url={ props.url }
                                    columns={ props.columns }
                                    setSortOrder={ props.setSortOrder }
                                    setFilter={ props.setFilter }
                                    query={ props.query } />
                                <Body data={ props.data } columns={ props.columns } />
                            </table>
                        </div>

                        <Pagination
                            name={ props.name }
                            url={ props.url }
                            setPage={ props.setPage }
                            { ...calculatePaginationProps(props.query.page, props.query.limit, props.query.count) } />

                    </div>
                </div>
            </div>
        </div>
    </div>

Table.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    columns: PropTypes.object.isRequired,
    limiterOptions: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    query: PropTypes.shape({
        sort: PropTypes.string,
        dir: PropTypes.string,
        page: PropTypes.number,
        limit: PropTypes.number,
        offset: PropTypes.number,
        count: PropTypes.number,
        search: PropTypes.object
    }).isRequired,
};

Table.defaultProps = {
    data: {},
    query: {
        limit: MIN_LIMIT,
        offset: 1,
        search: {}
    }
};

export default Table;
