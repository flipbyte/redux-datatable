import React from 'react';
import styled, { css } from 'styled-components';

const TableCell = styled.div `
    float: left;
    padding: 10px 5px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
`

export default TableCell;
