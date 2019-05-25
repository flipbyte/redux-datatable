import _ from 'lodash';
import { useState, useEffect } from 'react';
import { calculateWidth } from './utils';

// Table scroll manager
export const useTableScroll = ( tableBody, tableHeader ) => {
    const [ pointerEvents, setPointerEvents ] = useState('');
    const [ top, setTop ] = useState(0);

    const scrollEnded = _.debounce(() => setPointerEvents(''), 150);
    const handleScroll = () => {
        tableHeader.current.scrollLeft = tableBody.current.scrollLeft;
        setPointerEvents('none');
        setTop(tableBody.current.scrollTop);
    };

    useEffect(() => {
        if(typeof tableBody.current.addEventListener === 'function') {
            tableBody.current.addEventListener('scroll', handleScroll, true);
        }
        return () => {
            tableBody.current.removeEventListener('scroll', handleScroll, true);
        };
    }, [ tableBody.current ]);

    return [ top, pointerEvents ];
};


// Table width setter.
export const useTableWidth = ( tableBody, minWidth, visibleColumns ) => {
    const [ width, setWidth ] = useState(minWidth);
    const [ widthAdjustment, setWidthAdjustment ] = useState(1);

    const updateTableDimensions = ( ) => {
        const tableBodyEl = tableBody.current;
        const computedTableWidth = minWidth > tableBodyEl.clientWidth || !tableBodyEl.clientWidth
            ? minWidth
            : tableBodyEl.clientWidth;

        const percentage = computedTableWidth / calculateWidth(visibleColumns);
        setWidth(calculateWidth(visibleColumns, percentage));
        setWidthAdjustment(percentage);
    };

    useEffect(() => {
        window.addEventListener('resize', updateTableDimensions);
        return () => {
            window.removeEventListener('resize', updateTableDimensions);
        };
    }, []);

    useEffect(() => {
        updateTableDimensions();
    }, [ visibleColumns ]);

    return [ width, widthAdjustment ];
};
