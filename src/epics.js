import _ from 'lodash';
import { normalize } from 'normalizr';
import { ofType } from 'redux-observable';
import { Observable, of, pipe } from 'rxjs';
import { concatMap, switchMap, map, takeUntil, filter, catchError } from 'rxjs/operators';
import { createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR } from 'react-redux-notify';
import {
    receiveData,
    cancelRequest,
    requestData,
    REQUEST_DATA,
    RECEIVE_DATA,
    REQUEST_DATA_CANCEL,
    SET_PAGE,
    SET_FILTER,
    SET_SORT,
    SET_LIMIT,
    SET_SELECTION,
    DELETE_DATA
} from './actions';

const getResult = (response, resultPath) => resultPath
    ? _.get(response, resultPath, [])
    : response || [];

export const setParamsEpic = ( action$, state$ ) => action$.pipe(
    ofType(SET_PAGE, SET_FILTER, SET_SORT, SET_LIMIT),
    concatMap((action) => {
        const { meta: { name, routes, reducerName, entity } } = action;

        return of(
            cancelRequest({ name }),
            requestData({ name, routes, reducerName, entity })
        );
    })
);

export const fetchDataEpic = ( action$, state$, { api }) => action$.pipe(
    ofType(REQUEST_DATA),
    switchMap((action) => {
        const { name, routes, entity, reducerName } = action.meta;
        const query = _.get(state$.value, [reducerName, name]).query;

        return api.get(routes.get.route, {
            params: {
                ...routes.get.params,
                ...query
            }
        }).pipe(
            map((response) => {
                if(entity) {
                    const normalizedData = normalize(response, entity.responseSchema);
                    if(!_.isEmpty(normalizedData.entities)) {
                        const data = getResult(normalizedData.result, _.get(routes, 'get.resultPath.data', null));
                        return { response, data, ...normalizedData };
                    }
                }

                const data = getResult(response, _.get(routes, 'get.resultPath.data', null));
                return { response, data };
            }),
            map((payload) => receiveData({ name, payload })),
            catchError((error) => of(
                cancelRequest({ name }),
                createNotification({ type: NOTIFICATION_TYPE_ERROR, message: error.message })
            )),
            takeUntil(action$.pipe(
                ofType(REQUEST_DATA_CANCEL),
                filter((cancelAction) => cancelAction.name === name)
            ))
        );
    })
);

export const deleteDataEpic = ( action$, state$, { api }) => action$.pipe(
    ofType(DELETE_DATA),
    switchMap((action) => {
        const {
            meta: { name, routes, reducerName, entity },
            payload
        } = action;

        return api.delete(routes.delete.route, { params: payload.params }).pipe(
            concatMap((response) => {
                if(!response.success) {
                    return of(createNotification({ type: NOTIFICATION_TYPE_ERROR, message: response.result }));
                }

                return of(
                    createNotification({ type: NOTIFICATION_TYPE_SUCCESS, message: response.result }),
                    cancelRequest({ name }),
                    requestData({ name, routes, reducerName, entity })
                );
            }),
            catchError((error) => of(
                cancelRequest({ name }),
                createNotification({ type: NOTIFICATION_TYPE_ERROR, message: error.message })
            ))
        );
    })
);
