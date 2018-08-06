import { createStore, combineReducers, applyMiddleware } from 'redux';
import { apiMiddleware, sideEffectMiddleware } from '@monumentuminc/obisidian';

import specialist from 'domains/specialists/reducer';
import {
    SPECIALIST_LOGIN,
    SPECIALIST_LOGOUT,
    CREATE_SESSION_FETCH,
    DESTROY_SESSION_FETCH,
} from 'domains/specialists/constants';

const reducers = combineReducers({
    specialist,
});

const api = apiMiddleware((data) => {
    return data;
});

const sideEffects = sideEffectMiddleware({
    [CREATE_SESSION_FETCH]: {
        post: [{type: SPECIALIST_LOGIN}]
    },
    [DESTROY_SESSION_FETCH]: {
        post: [{type: SPECIALIST_LOGOUT}]
    },
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(
    api, sideEffects
)));