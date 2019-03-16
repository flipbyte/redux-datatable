import React from 'react';
import DatatableStyles from './DatatableStyles';

const DatatableContainer = ({ children }) =>
    <DatatableStyles.Container>
        { React.Children.map(children, (child, i) =>
            <DatatableStyles.Row key={ i }>{ child }</DatatableStyles.Row>
        ) }
    </DatatableStyles.Container>

export default DatatableContainer;
