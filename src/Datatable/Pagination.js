import React from 'react';
import { calculatePaginationProps } from '../utils';
import styled from 'styled-components';

const Container = styled.div `
    display: block;
    width: 100%;
    ${props => props.margin && css `
        margin: ${props.margin}
    `}
`

const Item = styled.div `
    display: flex;
    min-width: ${props => props.width || '200px'};
    float: ${props => props.right ? 'right' : 'left'};
    text-align: ${props => props.textAlign || 'left'};
    font-size: ${props => props.fontSize || '15px'};
    flex-direction: column;
    justify-content: center;
    height: 100%;
`

const isVisible = (visible, position) => (
    visible === true || (
        typeof visible === 'object' && (
            visible[position] === true || visible[position] === undefined
        )
    )
);

const Pagination = ({
    query = {},
    children,
    position,
    margin,
    config: { items = {}, visible = true }
}) => {
    const defaultLimit = items.limiter.default || 10;
    const paginationProps = calculatePaginationProps(query, defaultLimit);
    return(
        isVisible(visible, position) && <Container margin={ margin }>
            { Object.keys(items).map((key, index) => {
                const { visible: itemVisible, style, type } = items[key];
                return (
                    itemVisible && <Item key={ index } { ...style }>
                        { children(items[key], paginationProps, index) }
                    </Item>
                )
            })}
        </Container>
    )
}

export default Pagination;
