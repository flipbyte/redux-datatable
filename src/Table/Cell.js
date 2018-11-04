import React from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';
import { connect } from 'react-redux';
import { setSort } from '../actions';
import { prepareActionPayload } from '../utils'
import { withTableConfig } from '../TableProvider';

const changeSortOrder = ({ query, colName, sorter }, event) => {
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

const _prepareHeader = ( props ) => (
    ( props.sortable ) ?
        <th
            className={ 'sortable ' + props.colName + ' ' + ( props.colName == props.query.sort ? props.query.dir : '' ) }
            scope="col"
            onClick={ (event) => changeSortOrder(props, event) }
            { ...props.attributes } >

            { props.label } <b className="sort-caret"></b>
        </th> :
        <th>{ props.label }</th>
);

const Cell = ({ colName, query, label, isHeader, sortable, sorter, attributes }) => (
    ( isHeader ) ?
        _prepareHeader({ colName, query, label, isHeader, sortable, sorter, attributes }) :
        <td { ...attributes }>{ label }</td>
);

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
