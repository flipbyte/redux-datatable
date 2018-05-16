import React from 'react';
import PropTypes from "prop-types";

const changeSortOrder = ({ tableName, url, query, name, sorter }, event) => {
    let dir = null;
    if( query.sort != name ) {
        dir = 'asc';
    } else {
        if(query.dir == 'asc') {
            dir = 'desc';
        } else if(query.dir == 'desc') {
            name = '';
            dir = '';
        } else {
            dir = 'asc';
        }
    }

    sorter(tableName, url, name, dir);
}

const _prepareHeader = ( props ) =>
    ( props.sortable ) ?
        <th
            className={ 'sortable ' + props.name + ' ' + ( props.name == props.query.sort ? props.query.dir : '' ) }
            onClick={ (event) => changeSortOrder(props, event) }
            { ...props.attributes } >

            { props.label } <b className="sort-caret"></b>
        </th> :
        <th>{ props.label }</th>

const Cell = ({ tableName, name, url, query, label, isHeader, sortable, sorter, attributes }) =>
    ( isHeader ) ?
        _prepareHeader( { tableName, name, url, query, label, isHeader, sortable, sorter, attributes } ) :
        <td { ...attributes }>{ label }</td> ;

Cell.propTypes = {
    tableName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    isHeader: PropTypes.bool.isRequired,
    sortable: PropTypes.bool.isRequired,
    sorter: PropTypes.func,
    label: PropTypes.string.isRequired,
    attributes: PropTypes.object
};

Cell.defaultProps = {
    isHeader: false,
    attributes: {}
};

export default Cell;
