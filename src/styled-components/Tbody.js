import React from 'react';
import styled from 'styled-components';
import withScrollSpy from '../hoc/withScrollSpy';

const Tbody = styled.div.attrs(({ isPrinting, height }) => (
    isPrinting === false ? { style: { height } } : null
))`
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    overflow-y: ${props => props.isPrinting || props.innerHeight === props.visibleHeight ? 'hidden': 'scroll'};
    overflow-x: ${props => props.isPrinting ? 'hidden': 'scroll'};
    border-bottom: 1px solid #ddd;
`;

export default withScrollSpy(Tbody);
