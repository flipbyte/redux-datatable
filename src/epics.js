import { Observable  } from 'rxjs/Observable';
import get from 'lodash/get';
import { concatMap, switchMap, map, takeUntil, filter } from 'rxjs/Operator';
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


export const fetchDataEpic = ( action$, store, { apiGet, schemas } ) =>
    action$.ofType(REQUEST_DATA).switchMap( action => {
        const { route, resultPath, params } = action;

        return apiGet(route, params).execute()
            .map(response => {
                const requestResponse = get(response, resultPath.fetch.response, null);
                const data = get(response, resultPath.fetch.data, null);
                const payload = { response: requestResponse, data };

                return actionCreators.receiveData({ name, payload })
            }).takeUntil(
                action$.ofType(REQUEST_DATA_CANCEL)
                    .filter(cancelAction => cancelAction.name == name)
            )
    });

export const deleteDataEpic = ( action$, store, { apiDelete, schemas } ) =>
    action$.ofType(DELETE_DATA).switchMap( action => {
        const { name, url, routes, resultPath, reducerName, payload } = action;

        return apiDelete(routes.delete.route, payload.params).execute().concatMap(response => {
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
