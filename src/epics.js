import get from 'lodash/get';
import { ofType } from 'redux-observable';
import { Observable, of, pipe } from 'rxjs';
import { concatMap, switchMap, map, takeUntil, filter } from 'rxjs/operators';
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

export const setParamsEpic = ( action$, state$ ) => action$.pipe(
    ofType(SET_PAGE, SET_FILTER, SET_SORT, SET_LIMIT),
    concatMap(action => {
        const { meta: { name, routes, reducerName } } = action;

        return of(
            actionCreators.cancelRequest({ name }),
            actionCreators.requestData({
                name, routes, reducerName, payload: { query: get(state$.value, [reducerName, name]).query }
            })
        )
    })
);

export const fetchDataEpic = ( action$, state$, { api }) => action$.pipe(
    ofType(REQUEST_DATA),
    switchMap(action => {
        const {
            meta: { name, routes },
            payload
        } = action;

        return api.get(routes.get.route, { params: Object.assign({}, routes.get.params, payload.query) }).pipe(
            map(response => {
                const data = get(response, routes.get.resultPath.data, {});
                const payload = { response, data };
                return actionCreators.receiveData({ name, payload })
            }),
            takeUntil(action$.pipe(
                ofType(REQUEST_DATA_CANCEL),
                filter(cancelAction => cancelAction.name == name)
            ))
        )
    })
);

export const deleteDataEpic = ( action$, state$, { api }) => action$.pipe(
    ofType(DELETE_DATA),
    switchMap(action => {
        const {
            meta: { name, routes, reducerName },
            payload
        } = action;

        return api.delete(routes.delete.route, { params: payload.params }).pipe(
            concatMap(response => {
                if(!response.success) {
                    return of(actionCreators.setMessage({ type: 'danger', message: response.result }))
                }

                return of(
                    actionCreators.setMessage({ type: 'success', message: response.result }),
                    actionCreators.cancelRequest({ name }),
                    actionCreators.requestData({
                        name, routes, reducerName,
                        payload: { query: get(state$.value, [reducerName, name]).query }
                    })
                );
            })
        )
    })
)
