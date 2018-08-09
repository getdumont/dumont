import middlewares from './middlewares';
import specialist from 'domains/specialists/reducer';
import list from 'domains/lists/reducer';
import answer from 'domains/answers/reducer';

import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({
    specialist, list, answer
});

export default createStore(reducers, middlewares);