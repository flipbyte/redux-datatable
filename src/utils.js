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
