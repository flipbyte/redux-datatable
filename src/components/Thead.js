import React from 'react';
import styled from 'styled-components';

const Outer = styled.div `
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
`

export const Inner = styled.div.attrs(({ width = '100%' }) => ({
    style: { width }
})) `
    border-bottom: ${props => props.borderBottom || '1px solid #ddd'};
`

const Thead = React.forwardRef(({ children, width }, ref) => (
    <Outer ref={ ref }>
        <Inner width={ width }>
            { children }
        </Inner>
    </Outer>
));

export default Thead;
