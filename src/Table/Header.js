import React from 'react';
import PropTypes from "prop-types";

import Cell from './Cell';
import Filter from './Filter';

const Header = ({ query, columns, setSortOrder, setFilter }) =>
    <thead>
        <tr className="headers">
            { Object.keys(columns).map( (key) => (
                <Cell
                    key={ key }
                    isHeader={ true }
                    sortable={ columns[key].sortable ? true : false }
                    sorter={ setSortOrder }
                    name={ columns[key].name }
                    label={ columns[key].label }
                    query={ query }
                    attributes={ columns[key].attributes } />
            ) ) }
        </tr>
        <tr className="filters">
            { Object.keys(columns).map( (key) => (
                (columns[key].type != 'actions') ?
                    <Filter
                        key={ key }
                        type={ columns[key].type }
                        name={ columns[key].name }
                        filterer={ setFilter } /> :
                    <td key={ key }></td>
            ) ) }
        </tr>
    </thead>;

Header.propTypes = {
    columns: PropTypes.object.isRequired,
    setSortOrder: PropTypes.func,
    setFilter: PropTypes.func
};

export default Header;
