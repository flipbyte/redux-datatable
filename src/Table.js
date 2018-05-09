import React from 'react';
import PropTypes from "prop-types";
import Header from './Table/Header';
import Body from './Table/Body';
import Pagination from './Table/Pagination';

const calculatePaginationProps = (props) => {
    let page = props.page ? props.page : 1
    page > 1 ? page : 1

    let limit = props.limit ? props.limit : 10
    limit = limit > 10 ? limit: 10

    let start = (page - 1) * limit
    let count = props.count

    let end = start + limit - 1

    return {
        page: page,
        start: start,
        end: (count > end) ? end: count,
        limit: limit,
        count: count
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
                        <div className="table-responsive">
                            <table className="table table-striped table-sm">
                                <Header columns={ props.columns } />
                                <Body data={ props.data } columns={ props.columns } />
                            </table>
                            <Pagination { ...calculatePaginationProps(props) }/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

Table.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    query: PropTypes.shape({
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
        limit: 10,
        offset: 1,
        search: {}
    }
};

export default Table;
