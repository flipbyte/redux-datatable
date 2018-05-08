import React from 'react';
import PropTypes from "prop-types";

import Cell from './Cell';
import Filter from './Filter';

const Header = ({ columns }) =>
    <thead>
        <tr className="headers">
            { Object.keys(columns).map( (key) => (
                <Cell key={ key } isHeader={ true } label={ columns[key].label } attributes={ columns[key].attributes }/>
            ) ) }
        </tr>
        <tr className="filters">
            { Object.keys(columns).map( (key) => (
                <Filter key={ key } type={ columns[key].type } name={ columns[key].name } />
            ) ) }
        </tr>
    </thead>;

Header.propTypes = {
    columns: PropTypes.object.isRequired
};

export default Header;
