import React from 'react';
import { Div } from '../styled-components';

const lowerLimit = ( page, limit ) => ((page - 1) * limit) + 1;
const upperLimit = ( page, limit, count ) =>  (page * limit) > count || limit === 0 ? count : page * limit;

const ResultCount = ({
    page,
    limit,
    count,
    config: { styles = {} }
}) => (
    !!count > 0 && (
        <Div className="rdt-pg-res-cnt" styles={ styles }>
            Showing { lowerLimit(page, limit) } to { upperLimit(page, limit, count) } of { count } entries
        </Div>
    )
);

ResultCount.mapPropsToComponent = ({
    paginationProps: { page, limit, count }
}) => ({ page, limit, count });

export default ResultCount;
