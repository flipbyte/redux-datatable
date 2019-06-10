import React from 'react';

const lowerLimit = ( page, limit ) => ((page - 1) * limit) + 1;
const upperLimit = ( page, limit, count ) =>  (page * limit) > count || limit === 0 ? count : page * limit;

const ResultCount = ({ page, limit, count }) => (
    !!count > 0 &&
        <span className="rdt-pg-res-cnt">Showing { lowerLimit(page, limit) } to { upperLimit(page, limit, count) } of { count } entries</span>
);

ResultCount.mapPropsToComponent = ({
    paginationProps: { page, limit, count }
}) => ({ page, limit, count });

export default ResultCount;
