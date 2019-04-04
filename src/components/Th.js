import React from 'react';
import styled, { css } from 'styled-components';

import Td from './Td';

const Th = styled(Td) `
    font-weight: ${props => props.fontWeigth || 'bold'};
    background: ${props => props.background || '#f9fafb'};
    border-bottom: ${props => props.borderBottom || '1px solid rgba(34,36,38,.1)'};

    ${props => props.sortable && css `
        cursor: pointer;
    `}
`

export default Th;
