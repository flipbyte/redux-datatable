import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';

import Td from './Td';

const Th = styled(Td) `
    font-weight: bold;
    background: #f9fafb;
    border-bottom: 1px solid rgba(34, 36, 38, .1);
    cursor: ${props => props.sortable ? 'pointer': 'default'};
`
const ExtendedTh = styled(Th)(getExtendedStyles())
export default ExtendedTh;
