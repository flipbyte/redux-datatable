import _ from 'lodash';
import React from 'react';
import Row from './Row';

const Body = ({ data }) =>
    <tbody>
        { _.map(data, (item, index) => (
            <Row key={ index } itemIndex={ item } />
        )) }
    </tbody>

export default Body;
