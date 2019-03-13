import React, { Component } from 'react'
import { render } from 'react-dom';
import tables from './schema';
import ExampleTableContainer from './ExampleTableContainer';

const Demo = () =>
    <div className="d-flex" id="wrapper">
        <div className="bg-light border-right sidenav" id="sidebar-wrapper">
            <div className="sidebar-heading"><strong>formik-json</strong></div>
            <div className="list-group list-group-flush">
                { forms.map(({ id, title }, index) =>
                    <a key={ index } href={ `#${id}` }
                        className="list-group-item list-group-item-action bg-light">
                        { title }
                    </a>
                ) }
            </div>
        </div>
        <div id="page-content-wrapper">
            <div className="scrollmenu sticky">
                { tables.map(({ id, title }, index) =>
                    <a key={ index } href={ `#${id}` }>{ title }</a> ) }
            </div>
            <div className="container-fluid p-4 content">
                { tables.map((table, index) =>
                    <ExampleTableContainer key={ index } { ...table }/> )}
            </div>
        </div>
    </div>

render(<Demo/>, document.querySelector('#demo'))
