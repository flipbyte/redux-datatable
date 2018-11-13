import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";

import Cell from './Cell';
import Filter from './Filter';
import Selection from './Selection';

import { withTableConfig } from '../TableProvider';

const _renderRowItems = ( props ) => {
    const { key, type } = props;

    if(type == 'header') return <Cell { ...props } />
    if(type == 'selection') return <Selection { ...props } />
    if(type == 'actions') return <td key={ key } />

    return <Filter { ...props } />
}

const Header = ({ isHead, config: { columns } }) =>
    <thead>
        <tr className="headers">
            { _.map(columns, ({ sortable, name, label, width, attributes }, key) => (
                _renderRowItems({
                    key: key,
                    type: "header",
                    isHeader: true,
                    sortable: sortable ? true : false,
                    width: width,
                    colName: name,
                    label: label,
                    attributes: attributes
                })
            ) ) }
        </tr>
        { !!isHead &&
            <tr className="filters">
                { _.map(columns, ( column, key) => (
                    _renderRowItems({
                        key: key,
                        type: column.type,
                        colName: column.name,
                        columnConfig: column
                    })
                ) ) }
            </tr>
        }
    </thead>;

export default withTableConfig({
    columns: 'columns'
})(Header);
