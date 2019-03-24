import React from 'react';
import Styles from '../Styles';

const Header = ({ name, label, sortable, sorter, sort, dir, width, textAlign }) =>
    sortable ?
        <Styles.TableCell
            sortable
            header
            width={ `${width}px` }
            isSorted={ name === sort }
            dir={ dir }
            textAlign={ textAlign }
        >
            { label }
        </Styles.TableCell> :
        <Styles.TableCell header width={ `${width}px` } textAlign={ textAlign }>{ label }</Styles.TableCell>

export default Header;
