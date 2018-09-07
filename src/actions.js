import { createActionCreator } from './utils';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_DATA_CANCEL = 'REQUEST_DATA_CANCEL';

export const SET_PAGE = 'SET_PAGE';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_SELECTION = 'SET_SELECTION';
export const SET_MESSAGE = 'SET_MESSAGE';

export const DELETE_DATA = 'DELETE_DATA';


export const actionCreators =  {
    cancelRequest: createActionCreator(REQUEST_DATA_CANCEL),
    requestData: createActionCreator(REQUEST_DATA),
    receiveData: createActionCreator(RECEIVE_DATA),
    setPage: createActionCreator(SET_PAGE),
    setSort: createActionCreator(SET_SORT),
    setLimit: createActionCreator(SET_LIMIT),
    setFilter: createActionCreator(SET_FILTER),
    setSelection: createActionCreator(SET_SELECTION),
    deleteData: createActionCreator(DELETE_DATA),
    setMessage: createActionCreator(SET_MESSAGE)
};
