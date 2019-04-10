import qs from 'query-string';
import _ from 'lodash';

export const defaultLimiterCongig = {
    options: [10, 20, 50, 100, 200],
    default: 10,
};

export const isArray = (value) => Array.isArray(value);

export const getUrl = ( baseUrl, endpoint ) =>  baseUrl + endpoint;

export const getSelectedKeys = ( data, dataKey ) => {
    if ( !data[dataKey] ) {
        return false;
    }

    let selectedItems = {};
    selectedItems[dataKey] = Object.keys(data[dataKey])
        .filter(key => {
            if (data[dataKey][key] == true) {
                return key;
            }
        });

    const paramsObject = Object.assign({}, selectedItems);
    paramsObject.get = () => selectedItems;
    paramsObject.toString = () => qs.stringify(selectedItems);
    return paramsObject;
}

export const getConfigParam = ( param ) => {
    if ( !param.startsWith('@') ) {
        return false;
    }

    return param.substr(1);
};

export const getParam = ( param, data ) => {
    var dataKey = getConfigParam(param);
    if ( !dataKey ) {
        return false;
    }

    if (!data[dataKey]) {
        return false;
    }

    return data[dataKey];
};

export const paramsResolver = ( params, data ) => {
    let processedParams = {};
    for (var key in params) {
        let resolvedParam = getParam(params[key], data);
        if ( false === resolvedParam ) {
            continue;
        }

        processedParams[key] = resolvedParam;
    }

    const paramsObject = Object.assign({}, processedParams);
    paramsObject.get = () => processedParams;
    paramsObject.toString = () => qs.stringify(processedParams);

    return paramsObject;
};

export const createActionCreator = ( type ) => ( data ) => {
    const { name, reducerName, routes, entity, payload } = data;
    let action = ({ type, meta: { name, routes, reducerName, entity }, payload });
    action.toString = () => type;

    return action;
};

export const createReducer = (reducer, predicate) => (state, action) => (
    predicate(action) || state === undefined ? reducer(state, action) : state
);

export const prepareActionPayload = ({ name, reducerName, routes, entity }) => ( payload = {} ) => ({
    name, reducerName, routes, entity, payload
});

export const shouldUpdate = ( currentData, nextData, index ) => (
    _.get(currentData, index, '') != _.get(nextData, index, '')
);

export const getStyles = ( styles, name ) => (
    name && styles ? styles[name] : undefined
);

export const getExtendedStyles = ( name ) => ({ styles }) => (
    name ? styles ? styles[name] : undefined : styles
);
