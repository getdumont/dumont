const LIST_URL = (path) => {
    return `/lists/${path}`;
}

export default {
    getTweet: {
        path: LIST_URL('tweet'),
        method: 'GET'
    },
    nextIndex: {
        path: LIST_URL('next-index'),
        method: 'PUT'
    }
}