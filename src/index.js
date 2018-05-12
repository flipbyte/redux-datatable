import createTable, {
    createReducer,
    data,
    requestData,
    receiveData,
    setPage,
    setFilters,
    fetchDataEpic,
    REQUEST_DATA,
    RECEIVE_DATA,
    REQUEST_DATA_CANCEL,
    SET_PAGE,
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
    setFilters,
    fetchDataEpic,
    REQUEST_DATA,
    RECEIVE_DATA,
    REQUEST_DATA_CANCEL,
    SET_PAGE,
    SET_FILTERS
}

export default createTable;
