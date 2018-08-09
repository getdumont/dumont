import {
    ADD_WORD,
    REMOVE_WORD
} from './constants';

export const addWord = (word) => ({
    type: ADD_WORD,
    payload: word
});

export const removeWord = (word) => ({
    type: REMOVE_WORD,
    payload: word
});
