import _ from 'lodash';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withTableConfig } from '../TableProvider';
import TableHeader from './Table/Header';
import TableBody from './Table/Body';
import Styles from './Styles';
import Renderer from './Renderer';

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

        this.tableBody = React.createRef();
        this.tableHeader = React.createRef();
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

    calculateWidth(columns) {
        return columns.reduce((result, column) => result + (column.width || 0), 0);
    }

    updateTableDimensions() {
        this.computedTableWidth = this.minWidth > this.tableBody.clientWidth
            ? this.minWidth
            : this.tableBody.clientWidth;

        const { columns, allColumns, checkedColumns, stateUpdater } = this.props.config;
        const totalColumnsWidth = checkedColumns.reduce((result, columnIndex) => (
            result + (allColumns[columnIndex].width || 0)
        ), 0);
        const percentage = (this.computedTableWidth /*remove this*/|| 800) / totalColumnsWidth;

        let updatedColumns = checkedColumns.reduce((result, columnIndex) => (
            result.concat([{
                ...allColumns[columnIndex],
                width: Math.round(percentage * allColumns[columnIndex].width)
            }])
        ), [])

        this.width = this.calculateWidth(updatedColumns);
        stateUpdater({ columns: [ ...updatedColumns ] });
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
        // this.tableBody.addEventListener('scroll', this.handleScroll, true);
        window.addEventListener('resize', this.updateTableDimensions);
    }

    componentDidUpdate(prevProps) {
        this.updateTableOnColumnVisibilityChange(prevProps.config.columns, this.props.config.columns)
    }

    componentWillUnmount() {
        // this.tableBody.removeEventListener('scroll', this.handleScroll, true);
        window.removeEventListener('resize', this.updateTableDimensions);
    }

    render() {
        const { children, config: { columns }} = this.props;
        const { pointerEvents, top } = this.state;

        return (
            <Styles.Container>
                <Styles.Table>
                    <TableHeader ref={ elem => this.tableHeader = elem } width={ `${this.width}px` }>
                        <Styles.Row>
                            { columns.map((column, index) =>
                                <Renderer key={ index } ofType="header" width={ `${column.width}px` } { ...column } />
                            )}
                        </Styles.Row>
                        <Styles.Row>
                            { columns.map((column, index) =>
                                <Renderer key={ index } ofType="filter" width={ `${column.width}px` } { ...column } />
                            )}
                        </Styles.Row>
                    </TableHeader>
                    <TableBody
                        ref={ elem => this.tableBody = elem }
                        width={ this.width }
                        height={ this.height }
                        rowHeight={ this.rowHeight }
                        renderItem={
                            <Styles.Row>
                                { columns.map((column, index) =>
                                    <Renderer key={ index } ofType="body" { ...column } />
                                )}
                            </Styles.Row>
                        }
                    />
                </Styles.Table>
            </Styles.Container>
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
    checkedColumns: 'checkedColumns',
    reducerName: 'reducerName',
    stateUpdater: 'updateTableState'
})(connect(mapStateToProps)(Table));