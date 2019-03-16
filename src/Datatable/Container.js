import React from 'react';
import Styles from './Styles';

const Container = ({ children }) =>
    <Styles.Container>
        { React.Children.map(children, (child, i) =>
            <Styles.Row key={ i }>{ child }</Styles.Row>
        ) }
    </Styles.Container>

export default Container;
