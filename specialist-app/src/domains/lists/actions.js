import api from 'api';
import { TWEET_ON_LIST_STAGES } from './constants';

export const getTweet = () => ({
    type: TWEET_ON_LIST_STAGES,
    api: api.List.getTweet()
});
