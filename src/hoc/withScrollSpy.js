import React, { Component, useRef, useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { calculateWidth } from '../utils';
import ConfigContext from '../context';
import { SET_TABLE_WIDTH } from '../actions';

export let scrollerMap = {};

// const handleScroll = (setState, event) => {
//     _.map(scrollerMap, (ref, key, index) => (
//         ref.current.scrollLeft = event.target.scrollLeft
//     ))
//
//     // setState({ top: event.target.scrollTop, pointerEvents: 'none' });
// };

const withScrollSpy = WrappedComponent => (props) => {
    const { name } = props;
    const id = _.uniqueId(name);
    const ref = useRef(null);
    const [ scrollData, setScrollData ] = useState({ top: 0, pointerEvents: 'none' });
    const { getVisibleColumns, getData, minWidth, action, config: { height } } = useContext(ConfigContext);
    const visibleColumnIds = useSelector(getData(tableData => tableData.visibleColumnIds));
    const visibleColumns = visibleColumnIds ? getVisibleColumns(visibleColumnIds) : [];

    const updateTableDimensions = () => {
        const tableBodyEl = ref.current;
        const computedTableWidth = minWidth > tableBodyEl.clientWidth || !tableBodyEl.clientWidth
            ? minWidth
            : tableBodyEl.clientWidth;

        const percentage = computedTableWidth / calculateWidth(visibleColumns);
        action(SET_TABLE_WIDTH)({
            width: calculateWidth(visibleColumns, percentage),
            widthAdjustment: percentage
        })
    }

    const handleScroll = (event) => {
        _.map(scrollerMap, (ref, key, index) => (
            ref.current.scrollLeft = event.target.scrollLeft
        ))

        if (height) {
            setScrollData({ top: event.target.scrollTop, pointerEvents: 'none' });
        }
    };

    useEffect(() => {
        if (name === 'Body') {
            ref.current.removeEventListener('scroll', handleScroll, true);
            ref.current.addEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', updateTableDimensions)
            window.addEventListener('resize', updateTableDimensions)
        } else {
            scrollerMap[id] = ref;
        }

        return () => {
            if (name === 'Body') {
                ref.current.removeEventListener('scroll', handleScroll, true);
                window.removeEventListener('resize', updateTableDimensions)
            } else {
                delete scrollerMap[id];
            }
        }
    }, [ updateTableDimensions ]);

    return <WrappedComponent ref={ ref } { ...scrollData } { ...props } />;
}



// const withScrollSpy = WrappedComponent => (
//     class extends Component {
//         static contextType = ConfigContext
//
//         constructor(props, context) {
//             super(props, context);
//             this.id = _.uniqueId(this.props.name);
//             this.ref = React.createRef(null);
//
//             this.state = {
//                 top: 0,
//                 pointerEvents: 'none'
//             };
//
//             this.setTableWidth = this.context.action(SET_TABLE_WIDTH);
//             this.handleScroll = handleScroll.bind(this, this.setState.bind(this));
//         }
//
//         componentDidMount() {
//             if (typeof window === 'undefined') {
//                 return false;
//             }
//
//             const {
//                 minWidth,
//                 // config: {
//                 //     components: {
//                 //         Table: { columns }
//                 //     }
//                 // }
//             } = this.context;
//             if (this.props.name === 'Body') {
//                 console.log('body');
//                 this.ref.current.addEventListener('scroll', this.handleScroll, true);
//                 // window.addEventListener('resize', updateTableDimensions.bind(this, this.ref, minWidth, columns, this.setTableWidth));
//                 // updateTableDimensions(this.ref, minWidth, columns, this.setTableWidth);
//             } else {
//                 scrollerMap[this.id] = this.ref;
//             }
//         }
//
//         // componentDidUpdate(prevProps) {
//         //     const {
//         //         action,
//         //         minWidth,
//         //         config: {
//         //             name,
//         //             components: {
//         //                 Table: { columns }
//         //             }
//         //         }
//         //     } = this.context;
//         //     if (name === 'Body' && prevProps.columns !== columns) {
//         //         updateTableDimensions(this.ref, minWidth, columns, this.setTableWidth);
//         //     }
//         // }
//
//         componentWillUnmount() {
//             if (typeof window === 'undefined') {
//                 return false;
//             }
//
//             if (this.props.name === 'Body') {
//                 this.ref.current.removeEventListener('scroll', this.handleScroll, true);
//                 // window.removeEventListener('resize', updateTableDimensions.bind(this, this.setTableWidth));
//             }
//
//             delete scrollerMap[this.id];
//         }
//
//         render() {
//             return (
//                 <WrappedComponent ref={ this.ref } { ...this.state } { ...this.props } />
//             )
//         }
//     }
// );

export default withScrollSpy;
