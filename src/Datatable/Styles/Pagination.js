import React from 'react';
import styled, { css } from 'styled-components';

export const PaginationItem = styled.div `
    display: block;
    min-width: ${props => props.width || '200px'};
    float: ${props => props.right ? 'right' : 'left'};
    text-align: ${props => props.textAlign || 'left'};
    font-size: ${props => props.fontSize || '14px'};
`

export const PaginationList = styled.div `
    display: inline-flex;
    vertical-align: middle;
    background: ${props => props.background || '#fff'};
    border: ${props => props.border || '1px solid rgba(34,36,38,.15)'};
    border-radius: ${props => props.borderRadius || 'none'};
    height: ${props => props.height || '40px'}
`

export const PaginationListItem = styled.button `
    min-width: ${props => props.width || '42px'};
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    text-align: center;
    padding: ${props => props.padding || '13px 16px'};
    line-height: 1;
    cursor: pointer;
    transition: background .1s ease,box-shadow .1s ease,color .1s ease,-webkit-box-shadow .1s ease;
    background: ${props => props.background || '#fff'}
    border: ${props => props.border || 'none'};
    position: relative;

    &::before {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        height: 100%;
        width: 1px;
        background: #ebebeb;
    }

    &:last-child::before {
        height: 0;
    }

    &:hover {
        background: ${props => !props.disabled && (props.hoverBackground || '#ebebeb')}
    }

    ${props => props.active && css `
        background: ${props => props.activeBackground || '#007bff'};
        color: ${props => props.activeColor || '#fff'};
        font-weight: ${props => props.activeFontWeight || 'normal'}
    `}    
`

const Pagination = styled.div `
    display: block;
    width: 100%;
`

export default Pagination;
