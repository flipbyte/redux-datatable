import React from 'react';
import PropTypes from "prop-types";
import Styles from './Styles';

const Pagination = ({ children }) =>
    <Styles.Pagination>
        { React.Children.toArray(children)
            .sort((a, b) => (a.props.position || 0) - (b.props.position || 0))
            .map((child, index) => {
                const { style, visible } = child.props;
                return (
                    visible && <Styles.PaginationItem key={ index } { ...style }>
                        { child }
                    </Styles.PaginationItem>
                )
            })
        }
    </Styles.Pagination>

export default Pagination;
