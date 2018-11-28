import _ from 'lodash';
import Row from './Table/Row';
import Body from './Table/Body';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import Header from './Table/Header';
import Limiter from './Table/Limiter';
import Toolbar from './Table/Toolbar';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Pagination from './Table/Pagination';
import { withTableConfig } from './TableProvider';

class Table extends Component {
    constructor(props) {
        super(props);

        this.canUpdate = true;
        this.latestScrollY = 0;
        this.containerHeight = null;
        this.width = _.map(this.props.config.columns, 'width').reduce(( sum, num ) => sum + num, 0);

        this.rowHeight = this.props.rowHeight || 39;
        this.state = {
            top: 0,
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.scrollEnded = _.debounce(this.scrollEnded, 150);
        this.scrollBetween = _.throttle(this.scrollBetween, 150);
    }

    get height() {
        return this.props.data.length * this.rowHeight
    }

    scrollEnded() {
        this.setState({
            pointerEvents: '',
            // isScrolling: false
        })
    }

    scrollUpdate() {
        this.tableHeader.scrollLeft = this.tableBody.scrollLeft;
        this.setState({
            pointerEvents: 'none',
            top: this.tableBody.scrollTop,
            isScrolling: true
        })
    }

    scrollBetween() {
        this.setState({
            isScrolling: false
        })
    }

    handleScroll() {
        this.scrollEnded();
        this.scrollUpdate();
        this.scrollBetween();
    }

    componentDidMount() {
        this.tableBody.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        this.tableBody.removeEventListener('scroll', this.handleScroll, true);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.top !== this.state.top && nextState.isScrolling !== this.state.isScrolling;
    // }

    render() {
        const { name, isFetching, height, data } = this.props;
        const { pointerEvents, top, isScrolling } = this.state;

        return (
            <div className="flutter-table-outer-container">
                <div className="row toolbar-top mb-3">
                    <Toolbar />
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
                                    style={{ width: this.width + 'px' }}>
                                    <Header />
                                </div>
                            </div>
                            <div ref={ elem => this.tableBody = elem }
                                className="flutter-table-body-container col-xs-12"
                                style={{ height: height  + 'px' }}>
                                <div className="flutter-table-body-container-inner"
                                    style={{ width: this.width + 'px', height: this.height + 'px' }}>
                                    <div className="flutter-table-body">
                                        <Body data={ data }
                                            startTop={ top }
                                            visibleHeight={ height }
                                            rowHeight={ this.rowHeight }
                                            renderItem={ ({ index, item, top }) => (
                                                <Row
                                                    key={ index }
                                                    index={ index }
                                                    itemIndex={ item }
                                                    width={ this.width }
                                                    isScrolling={ isScrolling }
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
    reducerName: 'reducerName',
    rowHeight: 'rowHeight',
    columns: 'columns'
})(connect(mapStateToProps)(Table));
