import api from 'api';
import {
    ADD_ANSWER,
    REMOVE_ANSWER,
    UPDATE_ANSWER,
    QUESTIONS_LIST_STAGES
} from './constants';

export const getQuestions = () => ({
    type: QUESTIONS_LIST_STAGES,
    api: api.Answer.getQuestions,
});

export const addAnswer = () => ({
    type: ADD_ANSWER,
});

export const updateAnswer = (index, key, value) => ({
    type: UPDATE_ANSWER,
    payload: { index, key, value },
})

export const removeAnswer = (index) => ({
    type: REMOVE_ANSWER,
    payload: { index },
});