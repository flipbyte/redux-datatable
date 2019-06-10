import React from 'react';
import { isArray } from '../utils';

const Layout = ({ config, children, row: Row }) => isArray(config) && (
    config.map((row, index) => (
        <Row key={ index } className={ `rdt-row rdt-row-${index}` }>
            { row.map(children) }
        </Row>
    ))
);

export default Layout;
