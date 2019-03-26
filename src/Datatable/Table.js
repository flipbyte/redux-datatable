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
import { isArray } from '../utils';

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
        return this.props.data.items.length * this.rowHeight
    }

    scrollEnded() {
        this.setState({ pointerEvents: '' })
    }

    scrollUpdate() {
        this.tableHeader.current.scrollLeft = this.tableBody.current.scrollLeft;
        this.setState({
            pointerEvents: 'none',
            top: this.tableBody.current.scrollTop
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
        const tableBodyEl = this.tableBody.current;
        this.computedTableWidth = this.minWidth > tableBodyEl.clientWidth
            ? this.minWidth
            : tableBodyEl.clientWidth;

        const { columns, allColumns, checkedColumns, stateUpdater } = this.props.config;
        const totalColumnsWidth = checkedColumns.reduce((result, columnIndex) => (
            result + (allColumns[columnIndex].width || 0)
        ), 0);
        const percentage = this.computedTableWidth / totalColumnsWidth;

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
        this.tableBody.current.addEventListener('scroll', this.handleScroll, true);
        window.addEventListener('resize', this.updateTableDimensions);
    }

    componentDidUpdate(prevProps) {
        this.updateTableOnColumnVisibilityChange(prevProps.config.columns, this.props.config.columns)
    }

    componentWillUnmount() {
        this.tableBody.current.removeEventListener('scroll', this.handleScroll, true);
        window.removeEventListener('resize', this.updateTableDimensions);
    }

    getExtraBodyRowProps() {
        const {
            data,
            config: { columns }
        } = this.props;
        return columns.reduce((result = {}, { name, extraData }) => {
            result[name] = extraData
                ? isArray(extraData)
                    ? extraData.reduce((edResult, dataKey) => {
                        if(isArray(dataKey)) {
                            edResult[dataKey[1] || dataKey[0]] = _.get(data, dataKey[0]);
                        } else {
                            edResult[dataKey] = _.get(data, dataKey);
                        }

                        return edResult;
                    }, {})
                    : { [extraData]: _.get(data, extraData) }
                : {}
            return result;
        }, {})
    }

    render() {
        const {
            children,
            action,
            thunk,
            data,
            config: { columns, height },
        } = this.props;
        const { items = [], query = {} } = data;
        const { pointerEvents, top } = this.state;
        const bodyExtraData = this.getExtraBodyRowProps();

        return (
            <Styles.Container>
                <Styles.Table>
                    <TableHeader ref={ this.tableHeader } width={ `${this.width}px` }>
                        <Styles.Row>
                            { columns.map((column, index) =>
                                <Renderer
                                    key={ index }
                                    ofType="header"
                                    width={ `${column.width}px` }
                                    query={ query }
                                    action={ action }
                                    { ...column }
                                />
                            )}
                        </Styles.Row>
                        <Styles.Row>
                            { columns.map((column, index) =>
                                <Renderer
                                    key={ index }
                                    ofType="filter"
                                    width={ `${column.width}px` }
                                    query={ query }
                                    action={ action }
                                    { ...column }
                                />
                            )}
                        </Styles.Row>
                    </TableHeader>
                    <TableBody
                        ref={ this.tableBody }
                        width={ this.width }
                        height={ this.height }
                        data={ items }
                        startTop={ top }
                        visibleHeight={ height }
                        rowHeight={ this.rowHeight }
                        renderItem={ ({ index, item, top }) => (
                            <Styles.Row
                                key={ index }
                                position="absolute"
                                top={ `${top}px` }
                                height={ `${this.rowHeight}px` }
                                evenBackground="#f9fafb"
                                even={ index % 2 === 0 }
                            >
                                { columns.map((column, index) => {
                                    const props = {
                                        key: index,
                                        ofType: 'body',
                                        extra: bodyExtraData[column.name],
                                        action,
                                        thunk,
                                        top,
                                        item,
                                        ...column
                                    };
                                    return <Renderer { ...props } />
                                })}
                            </Styles.Row>
                        )}
                    />
                </Styles.Table>
            </Styles.Container>
        );
    }
}

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
})(Table);
