import React from 'react';
import PropTypes from "prop-types";
import Header from './Table/Header';
import Body from './Table/Body';

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
        limit: PropTypes.number,
        offset: PropTypes.number,
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
