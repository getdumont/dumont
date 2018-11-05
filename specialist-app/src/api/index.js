import forge, { setContext } from 'mappersmith';
import EncodeJson from 'mappersmith/middleware/encode-json'

import Specialist from './specialist';
import List from './list';
import Answer from './answer';

const TOKEN_KEY = 'dumont-especialista-token';
const ALLOWED_WITHOUT_TOKEN = Object.freeze([
    { path: '/specialists/session', method: 'POST' }
]);

const redirectToLogin = () => {
    window.location.href = '/login';
}

export const getToken = ({ token }) => {
    return localStorage.getItem(TOKEN_KEY) || token;
}

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    setContext({ token });
}

export const unsetToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    setContext({});
}

const isAllowedWithoutToken = (request) => {
    const { path, method } = request.methodDescriptor;
    return ALLOWED_WITHOUT_TOKEN.some((route) => {
        return route.path == path && route.method == method;
    });
}

const AuthMiddleware = ({ context }) => ({
    request(request) {
        const token = getToken(context);

        if (!token && !isAllowedWithoutToken(request)) {
            return Promise.resolve(redirectToLogin());
        }

        return request.enhance({
            headers: { 'auth-token': token }
        });
    },
    response(next) {
        return next().then((response) => {
            return response.data();
        }).catch(({ responseStatus }) => {
            if (responseStatus == 402) {
                redirectToLogin();
            }
        })
    }
});

export default forge({
    host: 'http://127.0.0.1:8081/',
    middleware: [ EncodeJson, AuthMiddleware ],
    resources: { Specialist, List, Answer }
});