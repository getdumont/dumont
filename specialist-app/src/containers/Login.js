import React from 'react';
import { LoginLayout } from '@opensanca/burro-react';
import { connect } from 'react-redux';
import { createSession, updateFormField } from 'domains/specialists/actions'
import { Map } from 'immutable';

const mapStateToProps = ({ specialist }) => {
    const specialistForm = specialist.get('sessionForm', new Map());

    return {
        email: specialistForm.get('email', ''),
        password: specialistForm.get('password', ''),
        errors: specialist.get('errors', null)
    }
};

const dipatchOnChange = (dispatch, key) => (e) => {
    return dispatch(updateFormField(key)(e.target.value));
}

const mapDispatchToProps = (dispatch) => ({
    createSession: (body) => dispatch(createSession(body)),
    onEmailChange: dipatchOnChange(dispatch, 'email'),
    onPasswordChange: dipatchOnChange(dispatch, 'password'),
});

export const LoginContainerComponent = ({
    email,
    password,
    createSession,
    onEmailChange,
    onPasswordChange,
}) => (
    <LoginLayout
        user={email}
        userOnChange={onEmailChange}
        userLabel='E-mail'
        pass={password}
        passOnChange={onPasswordChange}
        passLabel='Senha'
        buttonChildren='Entrar'
        onSubmit={() => createSession({ email, password })}
    />
);

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainerComponent);

export default LoginContainer;