import _ from 'lodash';
import React, { Component, useRef, useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import ConfigContext from '../context';

export let scrollerMap = {};

const withScrollSpy = WrappedComponent => (props) => {
    const { name } = props;
    const id = _.uniqueId(name);
    const ref = useRef(null);
    const [ scrollData, setScrollData ] = useState({ top: 0, pointerEvents: 'none' });
    const { getData, minWidth, config: { height } } = useContext(ConfigContext);

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
        } else {
            scrollerMap[id] = ref;
        }

        return () => {
            if (name === 'Body') {
                ref.current.removeEventListener('scroll', handleScroll, true);
            } else {
                delete scrollerMap[id];
            }
        }
    }, [ handleScroll ]);

    return <WrappedComponent ref={ ref } { ...scrollData } { ...props } />;
}

export default withScrollSpy;
