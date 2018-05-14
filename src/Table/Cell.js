import React from 'react';
import PropTypes from "prop-types";

const changeSortOrder = (tableName, url, query, name, sorter, event) => {
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

const Cell = ({
    tableName, name, url, query, label, isHeader, sorter, attributes
}) =>
    ( isHeader ) ?
        <th className={ 'sortable ' + ( name == query.sort ? query.dir : '' ) } { ...attributes } onClick={ (event) => changeSortOrder(tableName, url, query, name, sorter, event) }>{ label }</th> :
        <td { ...attributes }>{ label }</td> ;

Cell.propTypes = {
    tableName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    isHeader: PropTypes.bool.isRequired,
    sorter: PropTypes.func,
    label: PropTypes.string.isRequired,
    attributes: PropTypes.object
};

Cell.defaultProps = {
    isHeader: false,
    attributes: {}
};

export default Cell;
