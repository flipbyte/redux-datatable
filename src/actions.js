import { createActionCreator } from './utils';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const REQUEST_DATA_CANCEL = 'REQUEST_DATA_CANCEL';

export const SET_PAGE = 'SET_PAGE';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_SELECTION = 'SET_SELECTION';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const DELETE_DATA = 'DELETE_DATA';
export const MODIFY_DATA = 'MODIFY_DATA';

export const cancelRequest = createActionCreator(REQUEST_DATA_CANCEL);
export const requestData = createActionCreator(REQUEST_DATA);
export const receiveData = createActionCreator(RECEIVE_DATA);
export const setPage = createActionCreator(SET_PAGE);
export const setSort = createActionCreator(SET_SORT);
export const setLimit = createActionCreator(SET_LIMIT);
export const setFilter = createActionCreator(SET_FILTER);
export const setSelection = createActionCreator(SET_SELECTION);
export const deleteData = createActionCreator(DELETE_DATA);
export const clearFilter = createActionCreator(CLEAR_FILTER);
