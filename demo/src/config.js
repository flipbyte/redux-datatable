import { reducer, epics } from '../../src';
import pagesReducer from './reducer';

export default {
    tableReducerName: 'reduxDatatable',
    reducers: {
        reduxDatatable: reducer,
        pages: pagesReducer,
    },
    epics: {
        pageTableFetchDataEpic: epics.fetchDataEpic,
        pageTableSetParamsEpic: epics.setParamsEpic
    }
}
