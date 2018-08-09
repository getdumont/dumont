import api from 'api';
import { TWEET_ON_LIST_STAGES, ANALYZE_SAVE_STAGES } from './constants';

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
            api.Answer.saveAll({ payload: { to_tweet, question }}) :
            Promise.resolve();

        return Promise.all([ saveWord, saveQuestion ]).then(() => {
            return api.List.nextIndex();
        });
    }
});