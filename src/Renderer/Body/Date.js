import _ from 'lodash';
import Time from 'react-pure-time';
import React, { Component } from 'react';
import { shouldUpdate } from '../../utils';

const Date = ({
    data,
    index,
    colConfig: { name, textAlign, format }
}) => (
    <Time value={ _.get(data, name, '') } format={ format ? format : 'F j, Y, g:i a' } />
)

export default Date;
