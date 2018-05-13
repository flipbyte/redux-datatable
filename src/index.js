import createTable, {
    createReducer,
    data,
    requestData,
    receiveData,
    setPage,
    setLimit,
    setFilters,
    setParamsEpic,
    fetchDataEpic,
    REQUEST_DATA,
    RECEIVE_DATA,
    REQUEST_DATA_CANCEL,
    SET_PAGE,
    SET_LIMIT,
    SET_FILTERS
} from './createTable';

import Table from './Table';

export {
    Table,
    createReducer,
    data,
    requestData,
    receiveData,
    setPage,
    setLimit,
    setFilters,
    setParamsEpic,
    fetchDataEpic,
    REQUEST_DATA,
    RECEIVE_DATA,
    REQUEST_DATA_CANCEL,
    SET_PAGE,
    SET_LIMIT,
    SET_FILTERS
}

export default createTable;
