import { Map } from 'immutable';
import { detailReducer, baseDetailFetchOperations } from '@monumentuminc/obisidian';
import {
    CREATE_SESSION_STAGES,
    DESTROY_SESSION_STAGES,
    UPDATE_SESSION_FORM,
    SPECIALIST_LOGIN,
    SPECIALIST_LOGOUT
} from './constants'

const login = (state) => {
    if ((state.get('detail') || {}).token) {
        window.location.href = '/';
    }

    return state;
}

const logout = (state) => {
    return state;
}

const updateFormField = (state, { payload }) => {
    return state.setIn(['sessionForm', payload.key], payload.value);
};

export default detailReducer(CREATE_SESSION_STAGES, {
    sessionForm: new Map({ email: '', password: '' })
}, {
    ...baseDetailFetchOperations(DESTROY_SESSION_STAGES),
    [UPDATE_SESSION_FORM]: updateFormField,
    [SPECIALIST_LOGIN]: login,
    [SPECIALIST_LOGOUT]: logout
});