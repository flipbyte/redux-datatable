import React from 'react';

const lowerLimit = ( page, limit ) => ((page - 1) * limit) + 1;
const upperLimit = ( page, limit, count ) =>  (page * limit) > count ? count : page * limit;

const ResultCount = ({ page, limit, count }) =>
    !!count > 0 &&
        <span>Showing { lowerLimit(page, limit) } to { upperLimit(page, limit, count) } of { count } entries</span>

export default ResultCount
