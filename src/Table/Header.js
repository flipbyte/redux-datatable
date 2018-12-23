import _ from 'lodash';
import Cell from './Cell';
import Filter from './Filter';
import PropTypes from "prop-types";
import Selection from './Selection';
import React, { Component, Fragment } from 'react';
import { withTableConfig } from '../TableProvider';

const _renderRowItems = ( props ) => {
    var types = {
        header: <Cell { ...props } />,
        selection: <Selection { ...props } />,
        actions: null,
        default: <Filter { ...props } />
    }

    return types[props.type] || types['default'];
}

class Header extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.config.columns !== this.props.config.columns) {
            return true;
        }

        return false;
    }

    render() {
        const { columns, showFilters = true } = this.props.config;

        return (
            <Fragment>
                <div className="flutter-table-head-row headers">
                    { _.map(columns, ({ sortable, name, label, width, attributes }, key ) =>
                        <div className="flutter-table-row-item" key={ key } style={{ width: width + 'px' }}>
                            { _renderRowItems({
                                key: key,
                                type: "header",
                                isHeader: true,
                                sortable: sortable ? true : false,
                                colName: name,
                                label: label,
                                attributes: attributes
                            }) }
                        </div>
                    ) }
                </div>
                { showFilters &&
                    <div className="flutter-table-head-row filter">
                    { _.map(columns, ( column, key ) =>
                        <div className="flutter-table-row-item" key={ key }  style={{ width: column.width + 'px' }}>
                            { _renderRowItems({
                                key: key,
                                type: column.type,
                                colName: column.name,
                                columnConfig: column
                            }) }
                        </div>
                    ) }
                    </div>
                }
            </Fragment>
        )
    }
}

export default withTableConfig({
    columns: 'columns',
    showFilters: 'showFilters',
})(Header);
