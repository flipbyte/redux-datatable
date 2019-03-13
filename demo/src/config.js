import { reducer, epics } from '../../src';

export default {
    tableReducerName: 'reduxDatatable',
    reducers: {
        reduxDatatable: reducer
    },
    epics: {
        pageTableFetchDataEpic: epics.fetchDataEpic,
        pageTableSetParamsEpic: epics.setParamsEpic
    }
}
