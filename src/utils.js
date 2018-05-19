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
