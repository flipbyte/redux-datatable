import { Observable  } from 'rxjs/Observable';
import get from 'lodash/get';
import { concatMap, switchMap, map, takeUntil, filter } from 'rxjs/operator';
import { of } from 'rxjs/observable/of';
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
        const { name, routes, reducerName } = action;

        return Observable.of(
            actionCreators.cancelRequest({ name }),
            actionCreators.requestData({
                name, routes, reducerName, payload: { query: get(store.getState(), [reducerName, name]).query }
            })
        )
    });

export const fetchDataEpic = ( action$, store, { apiGet, schemas } ) =>
    action$.ofType(REQUEST_DATA).switchMap( action => {
        const { name, routes, resultPath, payload } = action;

        return apiGet(routes.get.route, Object.assign({}, routes.get.params, payload.query)).execute()
            .map(response => {
                const requestResponse = get(response, routes.get.resultPath.response, null);
                const data = get(response, routes.get.resultPath.data, null);
                const payload = { response: requestResponse, data };

                return actionCreators.receiveData({ name, payload })
            }).takeUntil(
                action$.ofType(REQUEST_DATA_CANCEL)
                    .filter(cancelAction => cancelAction.name == name)
            )
    });

export const deleteDataEpic = ( action$, store, { apiDelete, schemas } ) =>
    action$.ofType(DELETE_DATA).switchMap( action => {
        const { name, routes, reducerName, payload } = action;

        return apiDelete(routes.delete.route, payload.params).execute().concatMap(response => {
            const result = get(response, routes.delete.resultPath, null);
            if(result.success) {
                return Observable.of(
                    actionCreators.setMessage({ type: 'success', message: result.result }),
                    actionCreators.cancelRequest({ name }),
                    actionCreators.requestData({
                        name, routes, reducerName,
                        payload: { query: get(store.getState(), [reducerName, name]).query }
                    })
                );
            }

            return actionCreators.setMessage({ type: 'danger', message: result.result })
        })
    });
