import middlewares from './middlewares';

import { createStore, combineReducers } from 'redux';
import { getQuestions } from 'domains/answers/actions';

import specialist from 'domains/specialists/reducer';
import list from 'domains/lists/reducer';
import answer from 'domains/answers/reducer';

const reducers = combineReducers({
    specialist, list, answer
});

const store = createStore(reducers, middlewares);
store.dispatch(getQuestions());

export default store;