import React from 'react';
import Sortable from '../../components/Sortable';

const Column = ({ name, label, sortable, sort, dir }) => (
    <Sortable sortable={ sortable } show={ sort === name } dir={ dir }>
        { label }
    </Sortable>
);

export default Column;
