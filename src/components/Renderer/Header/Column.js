import React from 'react';
import { Sortable } from '../../../styled-components';

const Column = ({ name, label, sortable, sort, dir }) => (
    <Sortable
        className={ `rdt-th-inner ${sortable ? 'sortable' : ''} ${sort === name ? 'current': ''} ${dir}` }
        sortable={ sortable }
        current={ sort === name }
        dir={ dir }
    >
        { label }
    </Sortable>
);

export default Column;
