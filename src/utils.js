import qs from 'qs';

export const paramsResolver = (params, data) => {
    let processedParams = {};
    for(var key in params) {
        if( !params[key].startsWith('@') ) {
            continue;
        }

        let dataKey = params[key].substr(1);
        if(!data[dataKey]) {
            continue;
        }

        processedParams[key] = data[dataKey];
    }

    return qs.stringify(processedParams);
}

export const getValueByPath = ( obj, path ) =>
    path.reduce((acc, currVal) => (acc && acc[currVal]) ? acc[currVal] : null, obj);

export const createActionCreator = ( name, url ) => ( type ) => ( payload ) => {
    let action = ({ type: type, name, url, payload: payload });
    action.toString = () => type;

    return action;
}

export const createReducer = (reducer, predicate) => (state, action) =>
    predicate(action) || state === undefined ? reducer(state, action) : state
