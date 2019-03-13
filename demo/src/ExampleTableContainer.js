import React, { Component } from 'react';
import { render } from 'react-dom';
import ReduxDatatable from '../../src';

const ExampleTableContainer = ({ title, className, id, tableProps }) =>
    <div id={ id } className="form-container">
        <h5 className="card-title">{ title }</h5>
        <ReduxDatatable { ...tableProps } />
    </div>

export default ExampleTableContainer;
