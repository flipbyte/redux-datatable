import React, { Component } from 'react';
import Styles from '../Styles';

const TableBody = React.forwardRef(({ children, width }, ref) => (
    <Styles.TableBody innerRef={ ref }>
        <Styles.TableBodyInner width={ width }>
            { children }
        </Styles.TableBodyInner>
    </Styles.TableBody>
));

export default TableBody;
