import api from 'api';
import { TWEET_ON_LIST_STAGES, ANALYZE_SAVE_STAGES } from './constants';

const formatQuestions = (questions) => {
    return questions.map((question) => ({
        question_index: question.id,
        impact: question.impact
    }));
}

export const getTweet = () => ({
    type: TWEET_ON_LIST_STAGES,
    api: api.List.getTweet
});

export const finishTweetAnalyze = (to_tweet, question, words) => ({
    type: ANALYZE_SAVE_STAGES,
    api: () => {
        const saveWord = words && words.size > 0 ?
            api.Word.saveAll({ payload: { to_tweet, words }}) :
            Promise.resolve();

        const saveQuestion = question && question.size > 0 ?
            api.Answer.saveAll({ payload: { to_tweet, question: formatQuestions(question) }}) :
            Promise.resolve();

        return Promise.all([ saveWord, saveQuestion ]).then(() => {
            return api.List.nextIndex();
        });
    }
});