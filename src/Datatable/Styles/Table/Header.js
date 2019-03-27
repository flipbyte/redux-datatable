import React from 'react';
import styled from 'styled-components';

const TableHeader = styled.div `
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
`

export const TableHeaderInner = styled.div.attrs(({ width = '100%' }) => ({
    style: { width }
})) `
    border-bottom: ${props => props.borderBottom || '1px solid #ddd'};
`

export default TableHeader;
