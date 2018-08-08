import Answer from './model';
import { mountReducer, baseFetchOperations, setIn } from '@monumentuminc/obisidian';
import { List, Map } from 'immutable';
import {
    ADD_ANSWER,
    UPDATE_ANSWER,
    REMOVE_ANSWER,
    CLEAR_ANSWER,
    QUESTIONS_LIST_STAGES,
} from './constants';

const setQuestion = (questions) => (state) => {
    const list = new List(questions.map((q) => ({
        text: q, value: q
    })));

    return setIn('questions', list)(state)
}

const clearAnswer = (state) => {
    return setIn('answers', new List())(state);
}

const addAnswer = (state) => {
    return state.update('answers', (answers) => {
        const answer = new Answer();
        return answers.push(answer);
    });
}

const updateAnswer = (state, { payload }) => {
    const { index, key, value } = payload;
    return state.update('answers', (answers) => {
        return answers.update(index, (item) => {
            return item.set(key, value);
        });
    });
}

const removeAnswer = (state, { payload }) => {
    return state.update('answers', (answers) => {
        return answers.delete(payload.index);
    });
}

export default mountReducer(new Map({
    fetching: false,
    errors: [],
    questions: new List(),
    answers: new List()
}), {
    ...baseFetchOperations(setQuestion)(QUESTIONS_LIST_STAGES),
    [CLEAR_ANSWER]: clearAnswer,
    [UPDATE_ANSWER]: updateAnswer,
    [ADD_ANSWER]: addAnswer,
    [REMOVE_ANSWER]: removeAnswer,
})