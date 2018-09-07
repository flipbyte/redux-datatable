import { Observable  } from 'rxjs/Observable';
import get from 'lodash/get';
import { concatMap, switchMap, map, takeUntil, filter } from 'rxjs/operator';
import { of } from 'rxjs/observable/of';
// import { denormalize, normalize } from 'normalizr';
import { getRoute } from './utils';
import {
    actionCreators,
    REQUEST_DATA,
    RECEIVE_DATA,
    REQUEST_DATA_CANCEL,
    SET_PAGE,
    SET_FILTER,
    SET_SORT,
    SET_LIMIT,
    SET_MESSAGE,
    SET_SELECTION,
    DELETE_DATA
} from './actions';


export const setParamsEpic = ( action$, store ) =>
    action$.ofType(
        SET_PAGE,
        SET_FILTER,
        SET_SORT,
        SET_LIMIT,
    ).concatMap( action => {
        const { name, url, routes, resultPath, reducerName } = action;

        return Observable.of(
            actionCreators.cancelRequest({ name }),
            actionCreators.requestData({
                name, url, routes, resultPath, reducerName, payload: { query: get(store.getState(), [reducerName, name]).query }
            })
        )
    });

export const fetchDataEpic = ( action$, store, { api, schemas } ) =>
    action$.ofType(REQUEST_DATA).switchMap( action => {
        const { name, url, routes, resultPath, payload } = action;

        return api(
            getRoute(
                url, routes.fetch.route, Object.assign({}, routes.fetch.params, payload.query)
            ).getFormattedUrl()
        ).map(response => {
            const requestResponse = get(response, resultPath.fetch.response, null);
            const data = get(response, resultPath.fetch.data, null);
            // const data = schemas && schemas[name] ? normalize(result, [schemas[name]]) : result;
            const payload = { response: requestResponse, data };

            return actionCreators.receiveData({ name, payload })
        })
        .takeUntil(
            action$.ofType(REQUEST_DATA_CANCEL)
                .filter(cancelAction => cancelAction.name == name)
        )
    });

export const deleteDataEpic = ( action$, store, { api, schemas } ) =>
    action$.ofType(DELETE_DATA).switchMap( action => {
        const { name, url, routes, resultPath, reducerName, payload } = action;

        return api(getRoute(url, routes.delete.route, payload.params).getFormattedUrl(), { method: 'delete' })
            .concatMap(response => {
                const result = get(response, resultPath.delete, null);
                if(result.success) {
                    return Observable.of(
                        actionCreators.setMessage({ type: 'success', message: result.result }),
                        actionCreators.cancelRequest({ name }),
                        actionCreators.requestData({
                            name, url, routes, resultPath, reducerName,
                            payload: { query: get(store.getState(), [reducerName, name]).query }
                        })
                    );
                }

                return actionCreators.setMessage({ type: 'danger', message: result.result })
            })
    });
