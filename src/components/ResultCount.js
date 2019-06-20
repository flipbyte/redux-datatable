import React, { useContext } from 'react';
import { Div } from '../styled-components';
import { useSelector } from 'react-redux';
import ConfigContext from '../context';
import { calculatePaginationProps } from '../utils';

const lowerLimit = ( page, limit ) => ((page - 1) * limit) + 1;
const upperLimit = ( page, limit, count ) =>  (page * limit) > count || limit === 0 ? count : page * limit;

const ResultCount = ({
    // page,
    // limit,
    // count,
    config: { styles = {} }
}) => {
    const { defaultLimit, getData } = useContext(ConfigContext);
    const query = useSelector(getData((tableData) => tableData.query));
    const { page, limit, count } = calculatePaginationProps(query, defaultLimit)
    return !!count > 0 && (
        <Div className="rdt-pg-res-cnt" styles={ styles }>
            Showing { lowerLimit(page, limit) } to { upperLimit(page, limit, count) } of { count } entries
        </Div>
    )
};

// ResultCount.mapPropsToComponent = ({
//     paginationProps: { page, limit, count }
// }) => ({ page, limit, count });

export default ResultCount;
