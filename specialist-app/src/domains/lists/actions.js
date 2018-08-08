import api from 'api';
import { TWEET_ON_LIST_STAGES, ANALYZE_SAVE_STAGES } from './constants';

export const getTweet = () => ({
    type: TWEET_ON_LIST_STAGES,
    api: api.List.getTweet
});

export const finishTweetAnalyze = (to_tweet, question) => ({
    type: ANALYZE_SAVE_STAGES,
    api: () => api.Answer.saveAll({
        payload: { to_tweet, question }
    }).then(() => api.List.nextIndex())
})