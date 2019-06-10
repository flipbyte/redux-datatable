import React, { Component } from 'react';

export let scrollerMap = {};

// const handleScroll = (setState, event) => {
//     const left = event.target.scrollLeft;
//     _.map(scrollerMap, (ref, key, index) => (
//         ref.current.scrollLeft = left;
//     ))
//
//     this.setState({ pointerEvents: none, top: event.target.scrollTop });
// };

const withScrollSpy = WrappedComponent => (
    class extends Component {
        constructor(props) {
            super(props);
            this.ref = React.createRef(null);
            // this.state = { top: 0, pointerEvents: '' };
        }

        componentDidMount() {
            if (typeof window === 'undefined') {
                return false;
            }

            scrollerMap[this.props.name] = this.ref;
            // if (this.props.type === 'body') {
            //     this.ref.current.addEventListener('scroll', handleScroll.bind(this, setState), true);
            //     window.addEventListener('resize', updateTableDimensions);
            // }
        }

        componentWillUnmount() {
            if (typeof window === 'undefined') {
                return false;
            }

            // if (this.props.type === 'body') {
            //     this.ref.current.removeEventListener('scroll', handleScroll.bind(this, setState), true);
            //     window.removeEventListener('resize', updateTableDimensions);
            // }
            //
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
