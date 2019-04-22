import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';

const Td = styled.div.attrs(({ width: maxWidth }) => ({
    style: { maxWidth }
})) `
    flex-direction: column;
    justify-content: center;
    flex: 1;
    display: flex;
    padding: 10px 5px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    width: 100%;
    position: relative;
    overflow: hidden;
    font-size: 14px;

    &:empty {
        padding: 0
    }
`;

const ExtendedTd = styled(Td)(getExtendedStyles());
export default ExtendedTd;
