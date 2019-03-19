import React from 'react';
import Styles from '../Styles';

const Header = ({ name, label, sortable, sorter, sort, dir, width }) =>
    sortable ?
        <Styles.TableCell
            sortable
            header
            width={ `${width}px` }
            isSorted={ name === sort }
            dir={ dir }
        >
            { label }
        </Styles.TableCell> :
        <Styles.TableCell header width={ `${width}px` }>{ label }</Styles.TableCell>

export default Header;
