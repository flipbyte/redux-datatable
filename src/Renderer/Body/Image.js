import _ from 'lodash';
import React, { Fragment, Component } from 'react';

const Image = ({
    data,
    index,
    colConfig: { name, imgWidth, imgHeight }
}) => (
    <img src={ _.get(data, name, '') } width={ imgWidth } height={ imgHeight } />
);

export default Image;
