import { mountReducer } from '@monumentuminc/obisidian';
import { List, Map } from 'immutable';
import {
    ADD_WORD,
    REMOVE_WORD,
    CLEAR_WORD
} from './constants';

const addWord = (state, { payload }) => {
    return state.update('list', (words) => {
        return words.push(payload);
    });
}

const removeWord = (state, { payload }) => {
    return state.update('list', (words) => {
        return words.filter((w) => w != payload);
    });
}

const clearWord = (state) => {
    return state.set('list', new List());
}

export default mountReducer(new Map({
    list: new List()
}), {
    [CLEAR_WORD]: clearWord,
    [ADD_WORD]: addWord,
    [REMOVE_WORD]: removeWord,
})