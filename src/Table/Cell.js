import _ from 'lodash';
import React from 'react';
import { setSort } from '../actions';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { prepareActionPayload } from '../utils'
import { withTableConfig } from '../TableProvider';

const changeSortOrder = ( query, colName, sorter ) => {
    let dir = null;
    if( query.sort != colName ) {
        dir = 'asc';
    } else {
        if(query.dir == 'asc') {
            dir = 'desc';
        } else if(query.dir == 'desc') {
            colName = '';
            dir = '';
        } else {
            dir = 'asc';
        }
    }

    sorter(colName, dir);
}

const _prepareHeader = ({ sortable, colName, query, width, attributes, label, sorter }) =>
    ( sortable ) ?
        <div
            className={ 'flutter-table-header-item sortable ' + colName + ' ' + ( colName == query.sort ? query.dir : '' ) }
            scope="col"
            style={{ width: width }}
            onClick={ changeSortOrder.bind(this, query, colName, sorter) }
            { ...attributes } >
            { label } <b className="sort-caret"></b>
        </div> :
        <div className="flutter-table-header-item">{ label }</div>;


const Cell = ({ isHeader, ...rest }) =>
    isHeader ? _prepareHeader(rest) : <Fragment>{ props.label }</Fragment>

const mapStateToProps = ( state, { config: { reducerName, name } } ) => ({
    query: _.get(state, [reducerName, name, 'query'], {})
});

const mapDispatchToProps = ( dispatch, { config } ) => ({
    sorter: ( sort, dir ) => dispatch(setSort(prepareActionPayload(config)({ sort, dir }))),
});

export default withTableConfig({
    name: 'name',
    reducerName: 'reducerName',
    routes: 'routes',
    entity: 'entity'
})(connect(mapStateToProps, mapDispatchToProps)(Cell));
