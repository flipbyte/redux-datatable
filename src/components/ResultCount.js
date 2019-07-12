import React, { useContext } from 'react';
import { Div } from '../styled-components';
import { useSelector } from 'react-redux';
import ConfigContext from '../context';
import { calculatePaginationProps } from '../utils';

const lowerLimit = ( page, limit ) => ((page - 1) * limit) + 1;
const upperLimit = ( page, limit, count ) =>  (page * limit) > count || limit === 0 ? count : page * limit;

const ResultCount = ({
    config: { styles = {}, className = 'rdt-pg-res-cnt' }
}) => {
    const { defaultLimit, getData } = useContext(ConfigContext);
    const query = useSelector(getData((tableData) => tableData.query));
    const { page, limit, count } = calculatePaginationProps(query, defaultLimit);
    return !!count > 0 && (
        <Div className={ className } styles={ styles }>
            Showing { lowerLimit(page, limit) } to { upperLimit(page, limit, count) } of { count } entries
        </Div>
    );
};

export default ResultCount;
