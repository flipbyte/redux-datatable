import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Loader as Spinner } from '../styled-components';
import ConfigContext from '../context';

const Loader = () => {
    const {
        getData,
        Loader = {}
    } = useContext(ConfigContext);
    const isFetching = useSelector(getData(tableData => tableData.isFetching));
    return !!isFetching && <Spinner styles={ Loader.styles || {} } />;
};

export default Loader;
