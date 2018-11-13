import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Header from './Table/Header';
import Body from './Table/Body';
import Pagination from './Table/Pagination';
import Limiter from './Table/Limiter';
import Toolbar from './Table/Toolbar';
import { connect } from 'react-redux';
import { withTableConfig } from './TableProvider';

const SCROLL_DIRECTION_UP = 'up';
const SCROLL_DIRECTION_DOWN = 'down';

class Table extends Component {
    constructor(props) {
        super(props);

        this.canUpdate = true;
        this.latestScrollY = 0;
        this.rowHeight = this.props.rowHeight || 39;
        this.itemsCount = Math.ceil(this.props.height / this.rowHeight) + 10;
        this.scrollDirection = SCROLL_DIRECTION_DOWN;
        this.previousScrollDirection = SCROLL_DIRECTION_DOWN;
        this.state = {
            lowerLimit: 0,
            upperLimit: 20,
            top: 0,
        };

        this.rafRequest = null;
        this.handleScroll = this.handleScroll.bind(this);
        this.update = this.update.bind(this);
        this.scrollEnded = _.debounce(this.scrollEnded, 150);
    }

    requestAnimationFrame(callback) {
        var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        return raf(callback);
    }

    cancelAnimationFrame(raf) {
        var caf = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        caf(raf);
    }

    getActualHeight() {
        return this.props.data.length * this.rowHeight;
    }

    scrollEnded() {
        this.setState({ pointerEvents: '' })
    }

    update(target) {
        var scrollTop = parseFloat(target.scrollTop);

        // this.previousScrollDirection = this.scrollDirection;
        if(this.latestScrollY > scrollTop) {
            this.scrollDirection = SCROLL_DIRECTION_DOWN;
        } else {
            this.scrollDirection = SCROLL_DIRECTION_UP;
        }

        var lowerLimit, upperLimit;
        console.log(this.scrollDirection);
        if(this.scrollDirection === SCROLL_DIRECTION_DOWN) {
            lowerLimit = Math.floor(scrollTop / this.rowHeight);
            if(this.state.lowerLimit == lowerLimit) {
                return;
            }

            lowerLimit = lowerLimit >= 1 ? lowerLimit : 0;
            upperLimit = lowerLimit + this.itemsCount;
            upperLimit = upperLimit < this.props.data.length ? upperLimit : this.props.data.length;
        } else {
            upperLimit = Math.ceil((scrollTop + this.props.height) / this.rowHeight);
            upperLimit = upperLimit < this.props.data.length ? upperLimit : this.props.data.length;

            lowerLimit = upperLimit - this.itemsCount;
            lowerLimit = lowerLimit >= 1 ? lowerLimit : 0;
        }

        this.latestScrollY = scrollTop > 0 ? scrollTop : 0;

        var top = lowerLimit * this.rowHeight;
        // var offset = 0;
        // if(this.scrollDirection === SCROLL_DIRECTION_UP
        //     && this.previousScrollDirection !== SCROLL_DIRECTION_DOWN
        //     && top > this.props.height
        // ) {
        //     top = top - this.props.height;
        // }

        this.setState({
            lowerLimit: (lowerLimit),
            upperLimit: (upperLimit),
            top: top,
            pointerEvents: 'none',
        });

        console.log(this.state);
    }

    handleScroll({ currentTarget: target }) {
        this.scrollEnded();

        if(this.rafRequest) {
            this.cancelAnimationFrame(this.rafRequest);
        }

        this.rafRequest = this.requestAnimationFrame(this.update.bind(null, target));
    }

    render() {
        const { name, isFetching, height, data } = this.props;
        const { upperLimit, lowerLimit, pointerEvents, top } = this.state;

        return (
            <div className="flutter-table-outer-container">
                <div className="row toolbar-top mb-3">
                    <Toolbar />
                </div>
                <div className="row pagination-top">
                    <Pagination />
                </div>

                <div className="row">
                    <div id={ name } className="flutter-table-container table-responsive">
                        <div className="flutter-table-head col-xs-12">
                            <div className="flutter-table-head-inner">
                                <table className="table table-sm table-hover table-fixed flutter-table">
                                    <Header isHead />
                                </table>
                            </div>
                        </div>
                        <div
                            className="flutter-table-body col-xs-12"
                            style={{ height: height  + 'px' }}
                            onScroll={ this.handleScroll }>
                            <div className="flutter-table-body-inner" style={{ height: this.getActualHeight() + 'px' }}>
                                <table
                                    className="table table-sm table-hover table-fixed flutter-table"
                                    style={{
                                        top: top + 'px',
                                        pointerEvents: pointerEvents
                                    }}>
                                    <Header />
                                    <Body data={ data.slice(lowerLimit, upperLimit) }/>
                                </table>
                                <div className={ 'flutter-table-loader ' + (isFetching ? 'show': '')} />
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
    rowHeight: 'rowHeight'
})(connect(mapStateToProps)(Table));
