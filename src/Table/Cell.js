import React from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';
import { connect } from 'react-redux';
import { setSort } from '../actions';
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
        <th
            className={ 'sortable ' + colName + ' ' + ( colName == query.sort ? query.dir : '' ) }
            scope="col"
            style={{ width: width }}
            onClick={ changeSortOrder.bind(this, query, colName, sorter) }
            { ...attributes } >
            { label } <b className="sort-caret"></b>
        </th> :
        <th style={{ width: width }}>{ label }</th>;


const Cell = ( props ) =>
    props.isHeader ? _prepareHeader(props) : <td { ...props.attributes }>{ props.label }</td>;

const mapStateToProps = ( state, { config: { reducerName, name } } ) => ({
    query: get(state, [reducerName, name, 'query'], {})
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
