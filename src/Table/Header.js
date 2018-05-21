import React from 'react';
import PropTypes from "prop-types";

import Cell from './Cell';
import Filter from './Filter';
import Selection from './Selection';

const _renderRowItems = ( props ) => {
    const { key, type, filterer, selector, data } = props;

    if(type == 'header') return <Cell { ...props } />
    if(type == 'selection') return <Selection data={ data } selector={ selector } { ...props } />
    if(type == 'actions') return <td key={ key } />

    return <Filter filterer={ filterer } { ...props } />
}

const Header = ({ query, columns, data, setSortOrder, setFilter, setSelection }) =>
    <thead>
        <tr className="headers">
            { Object.keys(columns).map( (key) => (
                _renderRowItems({
                    key: key,
                    type: "header",
                    isHeader: true,
                    sortable: columns[key].sortable ? true : false,
                    sorter: setSortOrder,
                    name: columns[key].name,
                    label: columns[key].label,
                    attributes: columns[key].attributes,
                    query: query
                })
            ) ) }
        </tr>
        <tr className="filters">
            { Object.keys(columns).map( (key) => (
                _renderRowItems({
                    key: key,
                    type: columns[key].type,
                    name: columns[key].name,
                    selector: setSelection,
                    filterer: setFilter,
                    data: data,
                    config: columns[key]
                })
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
