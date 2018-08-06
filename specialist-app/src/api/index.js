import Specialist from './specialist';
import forge, { setContext } from 'mappersmith';
import EncodeJson from 'mappersmith/middleware/encode-json'

const TOKEN_KEY = 'dumont-especialista-token';

const AuthMiddleware = ({ context }) => ({
    request(request) {
        const token = localStorage.getItem(TOKEN_KEY) || context.token;
        return request.enhance({
            headers: { 'auth-token': token }
        });
    },
    response(next) {
        return next().then((response) => {
            return response.data();
        });
    }
})

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    setContext({ token });
}

export default forge({
    host: 'http://127.0.0.1:8081/',
    middleware: [ EncodeJson, AuthMiddleware ],
    resources: { Specialist }
});