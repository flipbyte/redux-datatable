import React from 'react';
import PropTypes from "prop-types";
import Header from './Table/Header';
import Body from './Table/Body';
import Pagination from './Table/Pagination';
import Limiter from './Table/Limiter';
import Toolbar from './Table/Toolbar';
import ResetFilters from './Table/ResetFilters';

const Table = ( props ) => {
    const {
        name,
        isFetching
    } = props;

    return (
        <div className="flutter-table-outer-container">
            <div className="row toolbar-top">
                <div className="col-sm-12 col-md-8 toolbar-top-left">
                    <Toolbar />
                </div>
                <div className="col-sm-12 col-md-4 toolbar-top-right">
                    <div className="row">
                        <div className="col-xs-3">
                            <ResetFilters />
                        </div>
                        <div className="col-xs-9">
                            <Limiter />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div id={ name } className="flutter-table-container table-responsive col-xs-12">
                    <table className="table table-sm table-hover flutter-table">
                        <Header />
                        <Body />
                    </table>
                    <div className={'flutter-table-loader ' + (isFetching ? 'show': '')} />
                </div>
            </div>

            <div className="row toolbar-bottom">
                <Pagination />
            </div>
        </div>
    );
}

export default Table;
