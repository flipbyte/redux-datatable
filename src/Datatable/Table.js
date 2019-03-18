import _ from 'lodash';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withTableConfig } from '../TableProvider';
import TableHeader from './Table/Header';
import Styles from './Styles';

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
        console.log(this.props.config.columns, this.props.config.allColumns);
        const { children, config: { columns }} = this.props;
        const { pointerEvents, top } = this.state;

        return (
            <Styles.TableContainer>
                <Styles.Table>
                    <TableHeader innerRef={ elem => this.tableHeader = elem } width={ this.width }>
                        <Styles.Row>
                            { columns.map((column, index) =>
                                <Styles.TableCell key={ index }>
                                    <Renderer for="header" { ...column } />
                                    <Renderer for="filter" { ...column } />
                                </Styles.TableCell>
                            )}
                        </Styles.Row>
                    </TableHeader>
                </Styles.Table>
            </Styles.TableContainer>
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
