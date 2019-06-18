import React, { Component } from 'react';
import { render } from 'react-dom';
import ReduxDatatable from '../../src';
import config from './config';

const ExampleTableContainer = ({ title, className, id, ...tableProps }) => (
    <div id={ id } className="form-container">
        <h5 className="card-title">{ title }</h5>
        <ReduxDatatable reducerName={ config.tableReducerName } { ...tableProps } />
    </div>
);

export default ExampleTableContainer;
