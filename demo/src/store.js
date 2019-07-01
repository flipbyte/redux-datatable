import _ from 'lodash';
import { Observable, pipe } from 'rxjs';
import notificationReducer from 'react-redux-notify';
import { filter, map, reduce } from 'rxjs/operators';
import { api, request } from './request-handlers';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { isUndefined } from '../../src/utils';

const requestHandlers = { api, request };

const _prepareReducers = function(reducers) {
    if(typeof reducers !== 'object') {
        return reducers;
    }

    for(var key in reducers) {
        if(reducers.hasOwnProperty(key)) {
            reducers[key] = _prepareReducers(reducers[key]);
        }
    }

    return reducers;
};

const prepareEpics = ( epics ) => {
    if( isUndefined(epics) || epics.length === 0 ) {
        return false;
    }

    const rootEpic = combineEpics(..._.values(epics));
    let dependencies = { ...requestHandlers };

    return { rootEpic, dependencies };
};

const configureStore = ( config ) => {
    const { reducers = {} } = config;
    let middlewares = [thunk];

    const logger = createLogger({ diff: true, duration: true, collapsed: true });
    middlewares.push(logger);

    const { rootEpic, dependencies } = prepareEpics(config.epics);
    const epicMiddleware = createEpicMiddleware({ dependencies: dependencies ? dependencies : {} });
    if(rootEpic) {
        middlewares.push(epicMiddleware);
    }

    reducers.notifications = notificationReducer;

    const rootReducer = combineReducers(_prepareReducers(reducers));
    const appliedMiddlewares = applyMiddleware(...middlewares);
    const enhancers = compose(appliedMiddlewares);

    const store = createStore(rootReducer, enhancers);

    if(rootEpic) {
        epicMiddleware.run(rootEpic);
    }

    return store;
};

const configureLogger = () => {
    const loggerMiddleware = createLogger({
        predicate: () => process.env.NODE_ENV === 'development',
        collapsed: true,
        diff: true
    });

    return loggerMiddleware;
};

export default configureStore;
