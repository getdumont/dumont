import api, { getToken } from 'api';
import {
    ADD_ANSWER,
    REMOVE_ANSWER,
    UPDATE_ANSWER,
    SET_QUESTIONS,
    QUESTIONS_LIST_STAGES
} from './constants';

const getQuestionsRequestCached = () => {
    const storageQuestions = localStorage.getItem('dumont-questions');

    if ((!storageQuestions || storageQuestions == 'undefined') && getToken({})) {
        return api.Answer.getQuestions().then((questions) => {
            localStorage.setItem('dumont-questions', JSON.stringify(questions));
            return questions;
        });
    } else {
        return Promise.resolve(JSON.parse(storageQuestions));
    }
}

export const getQuestions = () => ({
    type: QUESTIONS_LIST_STAGES,
    api: getQuestionsRequestCached,
});

export const addAnswer = () => ({
    type: ADD_ANSWER,
});

export const updateAnswer = (index, key, value) => {
    return {
        type: UPDATE_ANSWER,
        payload: { index, key, value },
    }
}

export const removeAnswer = (index) => ({
    type: REMOVE_ANSWER,
    payload: { index },
});