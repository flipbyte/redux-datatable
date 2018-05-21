import React from 'react';
import PropTypes from "prop-types";
import Header from './Table/Header';
import Body from './Table/Body';
import Pagination from './Table/Pagination';
import Limiter from './Table/Limiter';
import Toolbar from './Table/Toolbar';

const calculatePaginationProps = (page, limit, count, defaultLimit) => {
    page = page > 1 ? page : 1
    limit = limit > defaultLimit ? limit : defaultLimit

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
                            <div className="col-sm-12 col-md-9">
                                <Toolbar
                                    data={ props.selection }
                                    query={ props.query }
                                    massActions={ props.massActions }
                                    config={ props.config.toolbar } />
                            </div>
                            <div className="col-sm-12 col-md-3">
                                <Limiter
                                    setLimit={ props.setLimit }
                                    options={ props.limiterConfig.options } />
                            </div>
                        </div>

                        <div id={ props.name } className="flutter-table-container table-responsive">
                            <table className="table table-sm table-hover flutter-table">
                                <Header
                                    columns={ props.config.columns }
                                    query={ props.query }
                                    data={ props.data }
                                    setSortOrder={ props.setSortOrder }
                                    setFilter={ props.setFilter }
                                    setSelection={ props.actions.setSelection } />

                                <Body
                                    query={ props.query }
                                    data={ props.data }
                                    selection={ props.selection }
                                    actions={ props.actions }
                                    columns={ props.config.columns } />
                            </table>
                            <div className={'flutter-table-loader ' + (props.isFetching ? 'show': '')} />
                        </div>

                        <Pagination
                            setPage={ props.setPage }
                            { ...calculatePaginationProps(
                                props.query.page,
                                props.query.limit,
                                props.query.count,
                                props.limiterConfig.default
                            ) } />
                    </div>
                </div>
            </div>
        </div>
    </div>

Table.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    config: PropTypes.shape({
        toolbar: PropTypes.object,
        columns: PropTypes.object,
    }).isRequired,
    limiterConfig: PropTypes.shape({
        options: PropTypes.array,
        default: PropTypes.number,
    }).isRequired,
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
    actions: PropTypes.object,
};

Table.defaultProps = {
    data: {},
    query: {
        limit: 10,
        offset: 1,
        search: {}
    }
};

export default Table;
