import React, { Component, useRef, useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { calculateWidth } from '../utils';
import ConfigContext from '../context';
import { SET_TABLE_WIDTH } from '../actions';

export let scrollerMap = {};

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

        if (height && event.target.scrollTop !== scrollData.top) {
            setScrollData({ top: event.target.scrollTop, pointerEvents: 'none' });
        }
    };

    useEffect(() => {
        if (name === 'Body') {
            ref.current.removeEventListener('scroll', handleScroll, true);
            ref.current.addEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', updateTableDimensions);
            window.addEventListener('resize', updateTableDimensions);
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

    useEffect(() => updateTableDimensions(), [ ref.current ]);

    return <WrappedComponent ref={ ref } { ...scrollData } { ...props } />;
}

export default withScrollSpy;
