import _ from 'lodash';
import Row from './Table/Row';
import Body from './Table/Body';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import Header from './Table/Header';
import Limiter from './Table/Limiter';
import Toolbar from './Table/Toolbar';
import Columns from './Table/Columns';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Pagination from './Table/Pagination';
import { withTableConfig } from './TableProvider';

class Table extends Component {
    constructor(props) {
        super(props);

        this.width = this.calculateWidth(this.props.config.columns);
        this.minWidth = this.width;
        this.rowHeight = this.props.config.rowHeight || 39;
        this.state = { top: 0 };
        this.handleScroll = this.handleScroll.bind(this);
        this.updateTableDimensions = this.updateTableDimensions.bind(this);
        this.scrollEnded = _.debounce(this.scrollEnded, 150);
    }

    get height() {
        return this.props.data.length * this.rowHeight
    }

    scrollEnded() {
        this.setState({ pointerEvents: '' })
    }

    scrollUpdate() {
        this.tableHeader.scrollLeft = this.tableBody.scrollLeft;
        this.setState({
            pointerEvents: 'none',
            top: this.tableBody.scrollTop
        })
    }

    handleScroll() {
        this.scrollEnded();
        this.scrollUpdate();
    }

    calculateWidth(data) {
        return _.map(data, 'width').reduce(( sum, num ) => sum + num, 0);
    }

    updateTableDimensions() {
        this.computedTableWidth = this.minWidth > this.tableBody.clientWidth
            ? this.minWidth : this.tableBody.clientWidth;

        const { columns, allColumns, stateUpdater } = this.props.config;
        const totalColumnsWidth = this.calculateWidth(_.pick(allColumns, _.keys(columns)));
        const percentage = this.computedTableWidth / totalColumnsWidth;

        let updatedColumns = _.transform(columns, function(result, value, key) {
            result[key] = {
                ...value,
                width: Math.round(percentage * allColumns[key].width)
            };
        }, {});

        this.width = this.calculateWidth(updatedColumns);
        stateUpdater({ columns: { ...updatedColumns } });
    }

    updateTableOnColumnVisibilityChange(prevColumns, currentColumns) {
        let prevKeys = _.keys(prevColumns);
        let currentKeys = _.keys(currentColumns);
        if(!_.isEqual(prevKeys, currentKeys)) {
            this.updateTableDimensions();
        }
    }

    componentDidMount() {
        this.updateTableDimensions();
        this.tableBody.addEventListener('scroll', this.handleScroll, true);
        window.addEventListener('resize', this.updateTableDimensions);
    }

    componentDidUpdate(prevProps) {
        this.updateTableOnColumnVisibilityChange(prevProps.config.columns, this.props.config.columns)
    }

    componentWillUnmount() {
        this.tableBody.removeEventListener('scroll', this.handleScroll, true);
        window.removeEventListener('resize', this.updateTableDimensions);
    }

    render() {
        const { name, isFetching, data, config: { height, rowHeight } } = this.props;
        const { pointerEvents, top } = this.state;

        return (
            <div className="flutter-table-outer-container">
                <div className="row toolbar-top mb-3">
                    <Toolbar />
                    <Columns />
                </div>
                <div className="row pagination-top">
                    <Pagination />
                </div>

                <div className="row">
                    <div id={ name }
                        className="flutter-table-container table-responsive">
                        <div className="flutter-table table-striped">
                            <div ref={ elem => this.tableHeader = elem } className="flutter-table-head-container">
                                <div className="flutter-table-head-container-inner"
                                    style={{ width: this.width }}>
                                    <Header />
                                </div>
                            </div>
                            <div ref={ elem => this.tableBody = elem }
                                className="flutter-table-body-container col-xs-12"
                                style={{ height: this.height > height ? height : this.height }}>
                                <div className="flutter-table-body-container-inner"
                                    style={{ width: this.width, height: this.height }}>
                                    <div className="flutter-table-body">
                                        <Body data={ data }
                                            startTop={ top }
                                            visibleHeight={ height }
                                            rowHeight={ this.rowHeight }
                                            renderItem={ ({ index, item, top }) => (
                                                <Row
                                                    key={ index }
                                                    index={ index }
                                                    item={ item }
                                                    width={ this.width }
                                                    height={ rowHeight }
                                                    top={ top } />
                                            )} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row pagination-bottom mt-3">
                    <Pagination />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state, { config: { reducerName, name } } ) => ({
    data: _.get(state, [reducerName, name, 'items'], [])
})

export default withTableConfig({
    name: 'name',
    height: 'height',
    columns: 'columns',
    minWidth: 'minWidth',
    rowHeight: 'rowHeight',
    allColumns: 'allColumns',
    reducerName: 'reducerName',
    stateUpdater: 'updateTableState'
})(connect(mapStateToProps)(Table));
