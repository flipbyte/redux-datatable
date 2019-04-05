import React from 'react';
import styled from 'styled-components';
import { getExtendedStyles } from '../utils';

const Thead = React.forwardRef(({ className, children, width = '100%' }, ref) => (
    <div className={ className } ref={ ref }>
        <div style={{ width }}>
            { children }
        </div>
    </div>
));

const StyledThead = styled(Thead) `
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
`

const ExtendedStyledThead = styled(StyledThead)(getExtendedStyles());
export default ExtendedStyledThead;
