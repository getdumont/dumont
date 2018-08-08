const ANSWER_URL = (path) => {
    return `/answers/${path}`;
}

export default {
    getQuestions: {
        path: ANSWER_URL('questions'),
        method: 'GET'
    },
    saveAll: {
        path: ANSWER_URL(''),
        method: 'POST',
        bodyAttr: 'payload'
    }
}