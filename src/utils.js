import qs from 'query-string';
import _ from 'lodash';
// import { denormalize } from 'normalizr';

export const isArray = (value) => Array.isArray(value);
export const isObject = (value) => typeof value === 'object';
export const isUndefined = (value) => typeof value === 'undefined';
// export const getUrl = (baseUrl, endpoint) =>  baseUrl + endpoint;
export const toPascalCase = (str) => _.chain(str).camelCase().upperFirst().value();

// export const getParam = (dataKey, data) => {
//     if (!dataKey) {
//         return false;
//     }
//
//     const { [dataKey]: paramData } = data;
//     return paramData || false;
// };

export const createActionCreator = (type) => (data) => {
    const { name, reducerName, routes, entity, payload } = data;
    let action = ({ type, meta: { name, routes, reducerName, entity }, payload });
    action.toString = () => type;

    return action;
};


export const uuid = (a) => {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b)
}

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

export const calculateWidth = _.memoize(( columns, adjustment = 1 ) => (
    columns.reduce((result, column) => (
        result + ((column.width * adjustment) || 0)
    ), 0)
));

export const getInitialVisibleColumns = ( columns = [] ) => (
    columns.reduce((visibleColumnIndexes, column, index) => {
        if (column.visible !== false) {
            visibleColumnIndexes.push(index);
        }

        return visibleColumnIndexes;
    }, [])
);

export const getItemIds = (selection, items, primaryKey, schema) => (
    selection.all === true
        ? items.reduce((acc, item, index) => {
            const itemId = schema ? item : _.get(item, primaryKey);
            if (_.get(selection, ['selected', primaryKey, itemId]) !== false) {
                acc.push(itemId);
            }

            return acc;
        }, [])
        : _.reduce(_.get(selection, ['selected', primaryKey]), (acc, value, key) => {
            if (value !== false) {
                acc.push(key);
            }

            return acc;
        }, [])
)

export const calculatePaginationProps = _.memoize((
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
});

export const getVisibleColumns = _.memoize(
    (visibleColumnIds, columns) => (
        visibleColumnIds.reduce((result, currentIndex) => {
            const { [currentIndex]: column } = columns;
            return [ ...result, column ];
        }, [])
    )
);

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

export const prepareActionPayload = ({
    reducerName,
    config: { name, routes, entity, primaryKey }
}, action) => (
    ( payload = {} ) => ({ name, reducerName, routes, entity, payload, action, primaryKey })
);
