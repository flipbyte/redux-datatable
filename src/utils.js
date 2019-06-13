import qs from 'query-string';
import _ from 'lodash';
import { denormalize } from 'normalizr';

export const defaultLimiterCongig = {
    options: [10, 20, 50, 100, 200],
    default: 10,
};

export const isArray = (value) => Array.isArray(value);
export const isObject = (value) => typeof value === 'object';
export const isUndefined = (value) => typeof value === 'undefined';
export const getUrl = (baseUrl, endpoint) =>  baseUrl + endpoint;
export const toPascalCase = (str) => _.chain(str).camelCase().upperFirst().value();

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

export const getExtendedStyles = (name) => ({ styles = {} }) => {
    if (!name) {
        return styles;
    }

    const { [name]: style } = styles;
    return style;
};

export const getExtraBodyRowProps = (data, columns) => (
    columns.reduce((result = {}, { name, extraData }) => {
        result[name] = extraData
            ? isArray(extraData)
                ? extraData.reduce((edResult, dataKey) => {
                    if(isArray(dataKey)) {
                        edResult[dataKey[1] || dataKey[0]] = _.get(data, dataKey[0]);
                    } else {
                        edResult[dataKey] = _.get(data, dataKey);
                    }

                    return edResult;
                }, {})
                : { [extraData]: _.get(data, extraData) }
            : {};
        return result;
    }, {})
);

export const calculateWidth = ( columns, adjustment = 1 ) => (
    columns.reduce((result, column) => (
        result + ((column.width * adjustment) || 0)
    ), 0)
);

export const getInitialVisibleColumns = ( columns = [] ) => (
    columns.reduce((visibleColumnIndexes, column, index) => {
        if (column.visible !== false) {
            visibleColumnIndexes.push(index);
        }

        return visibleColumnIndexes;
    }, [])
);

export const prepareData = ( item, schema, state ) => {
    if (_.isEmpty(schema) || _.isObject(item)) {
        return item;
    }

    return denormalize(item, schema, state);
};

export const getItemIds = (selection, items, primaryKey, schema) => {
    if (schema) {
        return data;
    }

    return selection.all === true
        ? data.reduce((acc, item, index) => {
            if (_.get(selection, ['selected', primaryKey, _.get(item, primaryKey)]) !== false) {
                acc.push(_.get(item, primaryKey));
            }

            return acc;
        }, [])
        : _.reduce(_.get(selection, ['selected', primaryKey]), (acc, value, key) => {
            if (value !== false) {
                acc.push(key);
            }

            return acc;
        }, [])
}

export const calculatePaginationProps = (
    query = {},
    defaultLimit = 10
) => {
    let { page, limit = 0, count = 0 } = query;
    page = page > 1 ? page : 1;
    limit = isUndefined(limit) !== true ? limit : defaultLimit;

    let start = (page - 1) * limit;
    let end = start + limit - 1;

    return {
        page,
        start,
        end: (count > end && end >= 0) ? end : count,
        count,
        limit,
        total: limit > 0 ? Math.ceil(count / limit) : 1
    };
};

export const getRenderer = ( config, Renderers ) => {
    if (config.renderer && _.isFuntion(config.renderer)) {
        return config.renderer;
    }

    if (config.type) {
        const pcaseType = toPascalCase(config.type);
        return !isUndefined(Renderers[pcaseType]) ? Renderers[pcaseType] : Renderers.default;
    }

    return Renderers.default;
};
