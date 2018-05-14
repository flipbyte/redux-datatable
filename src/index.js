import createTable, {
    createReducer,
    data,
    requestData,
    receiveData,
    setPage,
    setSort,
    setLimit,
    setFilter,
    setParamsEpic,
    fetchDataEpic,
    REQUEST_DATA,
    RECEIVE_DATA,
    REQUEST_DATA_CANCEL,
    SET_PAGE,
    SET_SORT,
    SET_LIMIT,
    SET_FILTER
} from './createTable';

import Table from './Table';

export {
    Table,
    createReducer,
    data,
    requestData,
    receiveData,
    setPage,
    setSort,
    setLimit,
    setFilter,
    setParamsEpic,
    fetchDataEpic,
    REQUEST_DATA,
    RECEIVE_DATA,
    REQUEST_DATA_CANCEL,
    SET_PAGE,
    SET_SORT,
    SET_LIMIT,
    SET_FILTER
}

export default createTable;
