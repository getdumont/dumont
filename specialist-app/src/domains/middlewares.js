import { apiMiddleware, sideEffectMiddleware } from '@monumentuminc/obisidian';
import { ANALYZE_SAVE_FETCH } from 'domains/lists/constants';
import { CLEAR_ANSWER } from 'domains/answers/constants';
import { CLEAR_WORD } from 'domains/words/constants';
import { getTweet } from 'domains/lists/actions';
import { applyMiddleware } from 'redux';
import {
    SPECIALIST_LOGIN,
    SPECIALIST_LOGOUT,
    CREATE_SESSION_FETCH,
    DESTROY_SESSION_FETCH,
} from 'domains/specialists/constants';

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
        post: [{ type: CLEAR_WORD }, { type: CLEAR_ANSWER }, getTweet()]
    }
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default composeEnhancers(applyMiddleware(api, sideEffects))