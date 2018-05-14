import React from 'react';
import PropTypes from "prop-types";

import Cell from './Cell';
import Filter from './Filter';

const Header = ({ name, url, query, columns, setSortOrder, setFilter }) =>
    <thead>
        <tr className="headers">
            { Object.keys(columns).map( (key) => (
                <Cell
                    key={ key }
                    isHeader={ true }
                    sorter={ setSortOrder }
                    tableName={ name }
                    url={ url }
                    name={ columns[key].name }
                    label={ columns[key].label }
                    query={ query }
                    attributes={ columns[key].attributes } />
            ) ) }
        </tr>
        <tr className="filters">
            { Object.keys(columns).map( (key) => (
                <Filter
                    key={ key }
                    type={ columns[key].type }
                    name={ columns[key].name }
                    tableName={ name }
                    url={ url }
                    filterer={ setFilter } />
            ) ) }
        </tr>
    </thead>;

Header.propTypes = {
    columns: PropTypes.object.isRequired,
    setSortOrder: PropTypes.func,
    setFilter: PropTypes.func
};

export default Header;
