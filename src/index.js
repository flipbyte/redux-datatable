import createTable, {
    createReducer,
    data,
    requestData,
    receiveData,
    fetchDataEpic,
    REQUEST_DATA,
    RECEIVE_DATA,
    REQUEST_DATA_CANCEL
} from './createTable';

import Table from './Table';

export {
    Table,
    createReducer,
    data,
    requestData,
    receiveData,
    fetchDataEpic,
    REQUEST_DATA,
    RECEIVE_DATA,
    REQUEST_DATA_CANCEL
}

export default createTable;
