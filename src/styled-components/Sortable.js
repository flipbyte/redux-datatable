import React from 'react';
import styled, { css } from 'styled-components';

const Sortable = styled.a `
    display: block;
	max-width: 100%;

    ${props => props.sortable === true && css `
        padding-right: 18px;
	    position: relative;

        &:before,
        &:after {
            border: 4px solid transparent;
            content: "";
            display: block;
            height: 0;
            right: 5px;
            top: 50%;
            position: absolute;
            width: 0;
        }

        &:before {
            border-bottom-color: #aaa;
	        margin-top: -9px;
        }

        &:after {
            border-top-color: #aaa;
            margin-top: 1px;
        }

        ${props.current === true && (
            props.dir === 'asc' ?
                css `
                    &:before {
                        border-bottom-color: #000;
                    }
                `: css `
                    &:after {
                        border-top-color: #000;
                    }
                `
            )
        }

        ${props.current === true && props.dir === 'asc' && css `
            &:before {
                border-bottom-color: #000;
            }
        `}

        ${props.current === true && props.dir === 'desc' && css `
            &:after {
                border-top-color: #000;
            }
        `}
    `}
`;

export default Sortable;
