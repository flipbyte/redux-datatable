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
