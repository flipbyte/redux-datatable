import React, { Component } from 'react'
import { connect } from "react-redux";
import get from 'lodash/get';
import { actionCreators } from './actions';

import Table from './Table';

class FlutterTable extends Component {
    componentWillMount() {
        this.props.loadData();
    }

    componentWillUnmount() {
        this.props.clearMessage();
    }

    setValidPage(nextProps) {
        if(!nextProps.query || nextProps.query.count <= 0) {
            return true;
        }

        let totalEntries = parseInt(nextProps.query.count);
        let totalPages = Math.ceil(totalEntries / nextProps.query.limit);
        if(totalPages < this.props.query.page) {
            this.props.setPage(totalPages);
            return false
        }

        return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.setValidPage(nextProps);
    }

    render() {
        const { name, config, tablesData } = this.props;

        if(!name || !tablesData || !tablesData[name]) {
            return (
                <div className="status_message offline">
                    <p>
                        The table failed to initialise. Please check you are connected to the internet and try again.
                    </p>
                </div>
            );
        }

        let tableData = tablesData[name];
        let tableProps = {
            isFetching: tableData.isFetching,
            data: tableData.items,
            query: tableData.query,
            selection: tableData.selection,
            message: tableData.message
        };

        return (
            <Table name={ name }
                config={ config }
                limiterConfig={ config.limiterConfig }
                { ...tableProps }
                { ...this.props } />
        )
    }
}

const {
    requestData,
    setPage,
    setSort,
    setLimit,
    setFilter,
    setSelection,
    deleteData,
    setMessage
} = actionCreators;


const prepareActionPayload = ( ownProps ) => ( payload ) => {
    const { name, reducerName, config: {
        routes
    }} = ownProps;

    return { name, reducerName, routes, payload };
};

const mapStateToProps = ( state ) => {
    return {
        tablesData: state.flutterTable
    };
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
    let preparePayload = prepareActionPayload(ownProps);
    return {
        loadData: ( ) => {
            dispatch(setPage(preparePayload({ page: 1 })))
            dispatch(setLimit(preparePayload({ limit: 10 })))
            dispatch(setSort(preparePayload({ dir: 'desc' })))
        },
        clearMessage: ( ) => {
            dispatch(setMessage(preparePayload({})))
        },
        setPage: ( page ) => dispatch(setPage(preparePayload({ page }))),
        setSortOrder: ( sort, dir ) => dispatch(setSort(preparePayload({ sort, dir }))),
        setLimit: ( limit ) => dispatch(setLimit(preparePayload({ limit }))),
        setFilter: ( key, filter ) => dispatch(setFilter(preparePayload({ key, filter }))),
        actions: {
            setSelection: ( paramKey, key, value ) => dispatch(setSelection(preparePayload({ paramKey, key, value }))),
            route: ( payload, type ) => dispatch({
                type: type,
                payload: payload
            }),
            delete: ( params ) =>
                confirm("Are your sure you want to delete this page?") ? dispatch(deleteData(preparePayload({ params }))) : false,
        },
        massActions: {
            delete: ( params ) =>
                confirm("Are your sure you want to delete these page(s)?") ? dispatch(deleteData(preparePayload({ params }))) : false,
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(FlutterTable);
