import React from 'react';
import PropTypes from "prop-types";

import Cell from './Cell';
import Filter from './Filter';

const Header = ({ query, columns, setSortOrder, setFilter, setSelection }) =>
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
                        filterer={ setFilter }
                        selector={ setSelection } /> :
                    <td key={ key }></td>
            ) ) }
        </tr>
    </thead>;

Header.propTypes = {
    columns: PropTypes.object.isRequired,
    selection: PropTypes.object,
    setSortOrder: PropTypes.func,
    setFilter: PropTypes.func,
    setSelection: PropTypes.func
};

export default Header;
