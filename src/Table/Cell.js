import React from 'react';
import PropTypes from "prop-types";

const changeSortOrder = ({ query, name, sorter }, event) => {
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

    sorter(name, dir);
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

const Cell = ({ name, query, label, isHeader, sortable, sorter, attributes }) =>
    ( isHeader ) ?
        _prepareHeader( { name, query, label, isHeader, sortable, sorter, attributes } ) :
        <td { ...attributes }>{ label }</td> ;

Cell.propTypes = {
    name: PropTypes.string.isRequired,
    isHeader: PropTypes.bool.isRequired,
    sortable: PropTypes.bool.isRequired,
    sorter: PropTypes.func,
    label: PropTypes.string,
    attributes: PropTypes.object
};

Cell.defaultProps = {
    isHeader: false,
    attributes: {}
};

export default Cell;
