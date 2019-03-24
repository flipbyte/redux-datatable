import _ from 'lodash';
import { connect } from "react-redux";
import React, { Component } from 'react'

import Datatable from './Datatable';
import TableProvider from './TableProvider';
import { setPage, setLimit, setSort } from './actions';
import { createActionCreator, getLimiter } from './utils';

class ReduxDatatable extends Component {
    constructor(props) {
        super(props);

        this.state = { columns: null, checkedColumns: null };
        this.updateState = this.updateState.bind(this);
    }

    updateState(updatedObj) {
        this.setState(updatedObj);
    }

    componentDidMount() {
        const { tableData, loadData } = this.props;
        if(!_.isEmpty(tableData) && !_.isEmpty(tableData.items)) {
            return;
        }

        loadData();
    }

    setValidPage(nextProps) {
        var nextQuery = nextProps.tableData.query;
        if(!nextQuery || nextQuery.count <= 0) {
            return true;
        }

        let totalEntries = parseInt(nextQuery.count);
        let limit = nextQuery.limit != 0 ? nextQuery.limit : totalEntries;
        let totalPages = Math.ceil(totalEntries / limit);
        if(totalPages < this.props.tableData.query.page) {
            this.props.setPage(totalPages);
            return false
        }

        return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.setValidPage(nextProps);
    }

    getPropsWithState(props, addState) {
        if(addState !== false) {
            return { ...props, data: this.props.tableData }
        }

        return props;
    }

    render() {
        const { name, config, tableData, reducerName, action } = this.props;
        const { columns: allColumns, ...otherConfig } = config;
        const { toolbar, pagination } = config;
        const tableConfig = {
            ...otherConfig,
            allColumns,
            columns: this.state.columns || [ ...allColumns ],
            checkedColumns: this.state.checkedColumns || _.range(allColumns.length),
            updateTableState: this.updateState
        };

        if(!tableData) {
            return (
                <div className="status_message offline">
                    <p>
                        The table failed to initialise. Please check you are connected to the internet and try again.
                    </p>
                </div>
            );
        }

        const { query } = tableData;
        return (
            <TableProvider config={{ reducerName, ...tableConfig }}>
                <Datatable.Container>
                    <Datatable.Toolbar items={ toolbar } render={(ToolbarItem, { state, ...itemConfig }) =>
                        <ToolbarItem { ...this.getPropsWithState({ config: tableConfig, itemConfig, action }, state) } />
                    } />
                    <Datatable.Pagination
                        position="top"
                        margin="0 0 10px"
                        componentConfig={ pagination }
                        query={ query }
                        render={(PaginationItem, config, paginationProps) =>
                            <PaginationItem action={ action } { ...config } { ...paginationProps } />
                        }
                    />
                    <Datatable.Table />
                    <Datatable.Pagination
                        position="bottom"
                        margin="10px 0 0"
                        componentConfig={ pagination }
                        query={ query }
                        render={(PaginationItem, config, paginationProps) =>
                            <PaginationItem action={ action } { ...config } { ...paginationProps } />
                        }
                    />
                </Datatable.Container>
            </TableProvider>
        )
    }
}

const prepareActionPayload = ({ reducerName, config: { name, routes, entity }}) =>
    ( payload = {} ) => ({ name, reducerName, routes, entity, payload })

const mapStateToProps = ( state, { reducerName, config: { name } } ) => ({
    tableData: state[reducerName][name]
});

const mapDispatchToProps = ( dispatch, ownProps ) => {
    let preparePayload = prepareActionPayload(ownProps);
    return {
        loadData: ( ) => {
            dispatch(setPage(preparePayload({ page: 1 })))
            dispatch(setLimit(preparePayload({ limit: getLimiter(ownProps.config.pagination.items).default || 10 })))
            dispatch(setSort(preparePayload({ dir: 'desc' })))
        },
        action: ( type ) => ( payload ) => dispatch(createActionCreator(type)(preparePayload(payload))),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDatatable);
