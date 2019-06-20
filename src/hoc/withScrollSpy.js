import React, { Component } from 'react';
import { calculateWidth } from '../utils';
import ConfigContext from '../context';
import { SET_TABLE_WIDTH } from '../actions';

export let scrollerMap = {};

const handleScroll = (setState, event) => {
    _.map(scrollerMap, (ref, key, index) => (
        ref.current.scrollLeft = event.target.scrollLeft
    ))

    setState({ top: event.target.scrollTop, pointerEvents: 'none' });
};

const updateTableDimensions = (ref, minWidth, visibleColumns, setState) => {
    const tableBodyEl = ref.current;
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
        static contextType = ConfigContext

        constructor(props, context) {
            super(props, context);
            this.id = _.uniqueId(this.context.config.name);
            this.ref = React.createRef(null);

            this.state = {
                top: 0,
                pointerEvents: 'none'
            };

            this.setTableWidth = this.context.action(SET_TABLE_WIDTH);
            this.handleScroll = handleScroll.bind(this, this.setState.bind(this));
        }

        componentDidMount() {
            if (typeof window === 'undefined') {
                return false;
            }

            const {
                minWidth,
                config: {
                    name,
                    components: {
                        Table: { columns }
                    }
                }
            } = this.context;
            if (name === 'Body') {
                this.ref.current.addEventListener('scroll', this.handleScroll, true);
                window.addEventListener('resize', updateTableDimensions.bind(this, this.ref, minWidth, columns, this.setTableWidth));
                updateTableDimensions(this.ref, minWidth, columns, this.setTableWidth);
            } else {
                scrollerMap[this.id] = this.ref;
            }
        }

        componentDidUpdate(prevProps) {
            const {
                action,
                minWidth,
                config: {
                    name,
                    components: {
                        Table: { columns }
                    }
                }
            } = this.context;
            if (name === 'Body' && prevProps.columns !== columns) {
                updateTableDimensions(this.ref, minWidth, columns, this.setTableWidth);
            }
        }

        componentWillUnmount() {
            if (typeof window === 'undefined') {
                return false;
            }

            if (this.props.name === 'Body') {
                this.ref.current.removeEventListener('scroll', this.handleScroll, true);
                window.removeEventListener('resize', updateTableDimensions.bind(this, this.setTableWidth));
            }

            delete scrollerMap[this.id];
        }

        render() {
            return (
                <WrappedComponent ref={ this.ref } { ...this.state } { ...this.props } />
            )
        }
    }
);

export default withScrollSpy;
