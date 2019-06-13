import React, { Component } from 'react';
import { calculateWidth } from '../utils';

export let scrollerMap = {};

const handleScroll = (setState, event) => (
    setState({ pointerEvents: 'none', top: event.target.scrollTop, left: -event.target.scrollLeft })
);

const updateTableDimensions = (tableBody, minWidth, visibleColumns, setState) => {
    const tableBodyEl = tableBody.current;
    const computedTableWidth = minWidth > tableBodyEl.clientWidth || !tableBodyEl.clientWidth
        ? minWidth
        : tableBodyEl.clientWidth;

    const percentage = computedTableWidth / calculateWidth(visibleColumns);
    setState({
        width: calculateWidth(visibleColumns, percentage),
        widthAdjustment: percentage
    })
}

const withScrollSpy = WrappedComponent => (
    class extends Component {
        constructor(props) {
            super(props);
            this.ref = React.createRef(null);
        }

        componentDidMount() {
            if (typeof window === 'undefined') {
                return false;
            }

            const { name, setScrollData, setTableWidth, minWidth, columns } = this.props;

            scrollerMap[name] = this.ref;
            if (this.props.name === 'Body') {
                this.ref.current.addEventListener('scroll', handleScroll.bind(this, setScrollData), true);
                window.addEventListener('resize', updateTableDimensions.bind(this, this.ref, minWidth, columns, setTableWidth));
                updateTableDimensions(this.ref, minWidth, columns, setTableWidth);
            }
        }

        componentWillUnmount() {
            if (typeof window === 'undefined') {
                return false;
            }

            if (this.props.name === 'Body') {
                this.ref.current.removeEventListener('scroll', handleScroll.bind(this, this.props.setScrollData), true);
                window.removeEventListener('resize', updateTableDimensions.bind(this, this.props.setTableWidth));
            }

            delete scrollerMap[this.props.name];
        }

        render() {
            return (
                <WrappedComponent ref={ this.ref } { ...this.props } />
            )
        }
    }
);

export default withScrollSpy;
