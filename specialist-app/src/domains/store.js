import { createStore, combineReducers, applyMiddleware } from 'redux';
import { apiMiddleware, sideEffectMiddleware } from '@monumentuminc/obisidian';
import { getQuestions } from 'domains/answers/actions';
import { getTweet } from 'domains/lists/actions';

import specialist from 'domains/specialists/reducer';
import list from 'domains/lists/reducer';
import answer from 'domains/answers/reducer';

import { ANALYZE_SAVE_FETCH } from 'domains/lists/constants';
import { CLEAR_ANSWER } from 'domains/answers/constants';
import {
    SPECIALIST_LOGIN,
    SPECIALIST_LOGOUT,
    CREATE_SESSION_FETCH,
    DESTROY_SESSION_FETCH,
} from 'domains/specialists/constants';

const reducers = combineReducers({
    specialist, list, answer
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
    [ANALYZE_SAVE_FETCH]: {
        post: [getTweet(), { type: CLEAR_ANSWER }]
    }
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(
    api, sideEffects
)));

store.dispatch(getQuestions());
export default store;