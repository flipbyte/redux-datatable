import React from 'react';
import PropTypes from "prop-types";
import Header from './Table/Header';
import Body from './Table/Body';
import Pagination from './Table/Pagination';
import Limiter from './Table/Limiter';
import Toolbar from './Table/Toolbar';

const Table = ({ name, isFetching }) =>
    <div className="flutter-table-outer-container">
        <div className="row toolbar-top mb-3">
            <Toolbar />
        </div>
        <div className="row pagination-top">
            <Pagination />
        </div>

        <div className="row">
            <div id={ name } className="flutter-table-container table-responsive col-xs-12">
                <table className="table table-sm table-hover flutter-table">
                    <Header />
                    <Body />
                </table>
                <div className={ 'flutter-table-loader ' + (isFetching ? 'show': '')} />
            </div>
        </div>

        <div className="row pagination-bottom">
            <Pagination />
        </div>
    </div>

export default Table;
