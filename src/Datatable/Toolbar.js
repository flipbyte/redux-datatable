import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
    display: block;
    width: 100%;
`

const Row = styled.div `
    display: inline-block;
    width: 100%;
`

const Item = styled.div `
    display: block;
    width: ${props => props.width || 'auto'};
    float: ${props => props.right ? 'right' : 'left'};
    font-size: ${props => props.fontSize || '15px'};
`

const toolbarItem = ( children, item, index ) => {
    const { style, type, visible } = item;
    return (
        <Item key={ index } { ...style }>
            { visible !== false && children(item, index)  }
        </Item>
    );
}

const Toolbar = ({ items, children }) => (
    <Container>
        { items.map((row, rowIndex) =>
            <Row key={ rowIndex }>
                { row.map((item, itemIndex) => toolbarItem(children, item, itemIndex) )}
            </Row>
        )}
    </Container>
);

export default Toolbar;
