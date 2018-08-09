import api, { unsetToken, setToken } from 'api';
import { CREATE_SESSION_STAGES, DESTROY_SESSION_STAGES, UPDATE_SESSION_FORM } from './constants';

export const createSession = (payload) => ({
    type: CREATE_SESSION_STAGES,
    api: () => api.Specialist.login({ payload }).then(({ token }) => {
        setToken(token);
        return api.Specialist.sessionInfo().then((user) => {
            user.token = token;
            return user;
        });
    })
});

export const destroySession = () => ({
    type: DESTROY_SESSION_STAGES,
    api: () => api.Specialist.logout().then(() => {
        unsetToken();
        return {};
    })
});

export const updateFormField = (key) => (value) => ({
    type: UPDATE_SESSION_FORM,
    payload: { key, value }
});