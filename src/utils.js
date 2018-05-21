import qs from 'qs';

export const defaultLimiterCongig = {
    options: [10, 20, 50, 100, 200],
    default: 10,
};

export const getUrl = ( baseUrl, endpoint ) =>  baseUrl + endpoint;

// export const pushRoute = ( action, params, context ) => context.router.history.push({
//     pathname: action.route,
//     search: '?' + params.toString()
// });

export const getConfigParam = ( param ) => {
    if( !param.startsWith('@') ) {
        return false;
    }

    return param.substr(1);
}

export const getParam = ( param, data ) => {
    var dataKey = getConfigParam(param);
    if( !dataKey ) {
        return false;
    }

    if(!data[dataKey]) {
        return false;
    }

    return data[dataKey];
}

export const paramsResolver = ( params, data ) => {
    let processedParams = {};
    for(var key in params) {
        let resolvedParam = getParam(params[key], data);
        if( false === resolvedParam ) {
            continue;
        }

        processedParams[key] = resolvedParam;
    }

    const paramsObject = Object.assign({}, processedParams);
    paramsObject.get = () => processedParams;
    paramsObject.toString = () => qs.stringify(processedParams);;

    return paramsObject;
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
