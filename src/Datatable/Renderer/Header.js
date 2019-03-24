import React from 'react';
import Styles from '../Styles';
import { SET_SORT } from '../../actions';

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

    sorter({ sort: colName, dir });
}

const Header = ({ name, label, sortable, action, width, textAlign, query }) => {
    const { sort, dir } = query;
    return sortable ?
        <Styles.TableCell
            sortable
            header
            width={ `${width}px` }
            dir={ dir }
            textAlign={ textAlign }
            onClick={ changeSortOrder.bind(this, query, name, action(SET_SORT)) }
        >
            { label }
            { name === sort && <Styles.SortCaret dir={ dir } /> }
        </Styles.TableCell> :
        <Styles.TableCell header width={ `${width}px` } textAlign={ textAlign }>{ label }</Styles.TableCell>
}

export default Header;
