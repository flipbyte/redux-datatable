import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';

const Thead = styled.div `
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
`;

const ExtendedThead = styled(Thead)(getExtendedStyles());
export default ExtendedThead;
