import qs from 'query-string';
import _ from 'lodash';

export const defaultLimiterCongig = {
    options: [10, 20, 50, 100, 200],
    default: 10,
};

export const isArray = (value) => Array.isArray(value);

export const getUrl = (baseUrl, endpoint) =>  baseUrl + endpoint;

export const getSelectedKeys = (data, dataKey) => {
    const { [dataKey]: dataForFilter } = data;
    if (dataForFilter) {
        return false;
    }

    let selectedItems = {
        [dataKey]: Object.keys(dataForFilter).filter((key) => {
            const { [key]: value } = dataForFilter;
            return value === true;
        })
    };

    const paramsObject = Object.assign({}, selectedItems);
    paramsObject.get = () => selectedItems;
    paramsObject.toString = () => qs.stringify(selectedItems);
    return paramsObject;
};

export const getConfigParam = (param) => {
    if (!param.startsWith('@')) {
        return false;
    }

    return param.substr(1);
};

export const getParam = (param, data) => {
    var dataKey = getConfigParam(param);
    if (!dataKey) {
        return false;
    }

    const { [dataKey]: paramData } = data;
    return paramData || false;
};

export const paramsResolver = (params, data) => {
    let processedParams = {};
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            const { [key]: param } = params;
            let resolvedParam = getParam(param, data);
            if (false === resolvedParam) {
                continue;
            }

            processedParams = {
                ...processedParams,
                [key]: resolvedParam
            };
        }
    }

    const paramsObject = Object.assign({}, processedParams);
    paramsObject.get = () => processedParams;
    paramsObject.toString = () => qs.stringify(processedParams);

    return paramsObject;
};

export const createActionCreator = (type) => (data) => {
    const { name, reducerName, routes, entity, payload } = data;
    let action = ({ type, meta: { name, routes, reducerName, entity }, payload });
    action.toString = () => type;

    return action;
};

export const createReducer = (reducer, predicate) => (state, action) => (
    predicate(action) || typeof state === 'undefined' ? reducer(state, action) : state
);

export const prepareActionPayload = ({ name, reducerName, routes, entity }) => (payload = {}) => ({
    name, reducerName, routes, entity, payload
});

export const getStyles = (styles = {}, name) => {
    const { [name]: style } = styles;
    return style;
};

export const getExtendedStyles = (name) => ({ styles }) => {
    if (!name) {
        return styles;
    }

    const { [name]: style } = styles;
    return style;
};
