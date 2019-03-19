import React, { Component } from 'react';
import Styles from '../Styles';

const TableHeader = React.forwardRef(({ children, width }, ref) => (
    <Styles.TableHeader ref={ ref }>
        <Styles.TableHeaderInner width={ width }>
            { children }
        </Styles.TableHeaderInner>
    </Styles.TableHeader>
));

export default TableHeader;
