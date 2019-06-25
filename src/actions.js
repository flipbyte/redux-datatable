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
export const SET_IS_LOADING = 'IS_LOADING';
export const SET_IS_EDITING = 'SET_IS_EDITING';
export const SET_IS_PRINTING = 'SET_IS_PRINTING';
export const SET_TABLE_WIDTH = 'SET_TABLE_WIDTH';
export const SET_VISIBLE_COLUMN_IDS = 'SET_VISIBLE_COLUMN_IDS';
export const SET_COLUMN_WIDTHS = 'SET_COLUMN_WIDTHS';
export const SET_BODY_INNER_WIDTH = 'SET_BODY_INNER_WIDTH';

export const cancelRequest = createActionCreator(REQUEST_DATA_CANCEL);
export const requestData = createActionCreator(REQUEST_DATA);
export const receiveData = createActionCreator(RECEIVE_DATA);
export const setPage = createActionCreator(SET_PAGE);
export const setSort = createActionCreator(SET_SORT);
export const setLimit = createActionCreator(SET_LIMIT);
export const setFilter = createActionCreator(SET_FILTER);
export const setSelection = createActionCreator(SET_SELECTION);
export const setIsEditing = createActionCreator(SET_IS_EDITING);
export const deleteData = createActionCreator(DELETE_DATA);
export const clearFilter = createActionCreator(CLEAR_FILTER);
