import _ from 'lodash';
import { connect } from "react-redux";
import React, { Component } from 'react'

import Table from './Table';
import TableProvider from './TableProvider';
import { setPage, setLimit, setSort } from './actions';

class FlutterTable extends Component {
    componentWillMount() {
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

    render() {
        const { name, config, tableData, reducerName } = this.props;

        if(!tableData) {
            return (
                <div className="status_message offline">
                    <p>
                        The table failed to initialise. Please check you are connected to the internet and try again.
                    </p>
                </div>
            );
        }

        return (
            <TableProvider config={ { reducerName, ...config } }>
                <Table name={ name } isFetching={ tableData.isFetching } />
            </TableProvider>
        )
    }
}

const prepareActionPayload = ({ name, reducerName, config: { routes, entity }}) =>
    ( payload = {} ) => ({ name, reducerName, routes, entity, payload })

const mapStateToProps = ( state, { reducerName, name } ) => ({
    tableData: state[reducerName][name]
});

const mapDispatchToProps = ( dispatch, ownProps ) => {
    let preparePayload = prepareActionPayload(ownProps);
    return {
        loadData: ( ) => {
            dispatch(setPage(preparePayload({ page: 1 })))
            dispatch(setLimit(preparePayload({ limit: _.get(ownProps.config, 'limiterConfig.default', 10) })))
            dispatch(setSort(preparePayload({ dir: 'desc' })))
        },
        setPage: ( page ) => dispatch(setPage(preparePayload({ page }))),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlutterTable);
