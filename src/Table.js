import React from 'react';
import PropTypes from "prop-types";
import Header from './Table/Header';
import Body from './Table/Body';
import Pagination from './Table/Pagination';
import Limiter from './Table/Limiter';
import Toolbar from './Table/Toolbar';
import Message from './Table/Message';

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

const Table = ( props ) => {
    const {
        title,
        message,
        name,
        selection,
        query,
        toolbar,
        limiterConfig,
        config,
        data,
        isFetching,
        setLimit,
        setPage,
        setFilter,
        setSortOrder,
        actions,
        massActions,
    } = props;

    return (
        <div>
            { !!message.type && <Message message={ message } /> }
            <div className="row">
                <div className="col-sm-12 col-md-9">
                    <Toolbar
                        selection={ selection }
                        query={ query }
                        massActions={ massActions }
                        config={ config.toolbar } />
                </div>
                <div className="col-sm-12 col-md-3">
                    <Limiter
                        setLimit={ setLimit }
                        options={ limiterConfig.options } />
                </div>
            </div>

            <div id={ name } className="flutter-table-container table-responsive">
                <table className="table table-sm table-hover flutter-table">
                    <Header
                        columns={ config.columns }
                        query={ query }
                        data={ data }
                        setSortOrder={ setSortOrder }
                        setFilter={ setFilter }
                        setSelection={ actions.setSelection } />

                    <Body
                        query={ query }
                        data={ data }
                        selection={ selection }
                        actions={ actions }
                        columns={ config.columns } />
                </table>
                <div className={'flutter-table-loader ' + (isFetching ? 'show': '')} />
            </div>

            <Pagination
                setPage={ setPage }
                { ...calculatePaginationProps(
                    query.page,
                    query.limit,
                    query.count,
                    limiterConfig.default
                ) } />
        </div>
    );
}

Table.propTypes = {
    name: PropTypes.string.isRequired,
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
