const SPECIALIST_SESSION = '/specialists/session'

export default {
    login: {
        path: SPECIALIST_SESSION,
        method: 'POST',
        bodyAttr: 'payload',
    },
    logout: {
        path: SPECIALIST_SESSION,
        method: 'DELETE'
    },
    sessionInfo: {
        path: SPECIALIST_SESSION,
        method: 'GET'
    },
    get: {
        path: '/specialists/{id}',
        method: 'GET'
    }
}