import React, { Component } from 'react';
import { render } from 'react-dom';
import tables from './schema';
import ExampleTableContainer from './ExampleTableContainer';
import { Provider } from 'react-redux';
import configureStore from './store';
import config from './config';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/simple-sidebar.css';
import './css/styles.css';

const store = configureStore(config);

const Demo = () => (
    <div className="d-flex" id="wrapper">
        <div className="bg-light border-right sidenav" id="sidebar-wrapper">
            <div className="sidebar-heading"><strong>redux-datatable</strong></div>
            <div className="list-group list-group-flush">
                { tables.map(({ id, title }, index) => (
                    <a key={ index } href={ `#${id}` }
                        className="list-group-item list-group-item-action bg-light">
                        { title }
                    </a>
                ))}
            </div>
        </div>
        <div id="page-content-wrapper">
            <div className="scrollmenu sticky">
                { tables.map(({ id, title }, index) => (
                    <a key={ index } href={ `#${id}` }>{ title }</a>
                ))}
            </div>
            <div className="container-fluid p-4 content">
                { tables.map((table, index) => (
                    <ExampleTableContainer key={ index } { ...table }/>
                ))}
            </div>
        </div>
    </div>
);

render(
    <Provider store={ store }>
        <Demo/>
    </Provider>,
    document.querySelector('#demo')
);
