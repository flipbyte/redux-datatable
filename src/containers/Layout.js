import React from 'react';
import { isArray } from '../utils';
import { Container } from '../styled-components';

const Layout = ({ config, children, row: Row }) => isArray(config) && (
    <Container>
        { config.map((row, index) => (
            <Row key={ index } className={ `rdt-row rdt-row-${index}` }>
                { row.map(children) }
            </Row>
        ))}
    </Container>
);

export default Layout;
