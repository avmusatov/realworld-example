import { Dispatch } from 'redux';
import { SignUpData, SignInData, UserAction, UserActionTypes } from '../types/userTypes';
import { makePostRequest, makePutRequest } from '../../helpers/requests';
import { History } from 'history';

export const signUpUser =
    (history: History, { email, password, username }: SignUpData) =>
    async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.TRY_AUTH });
        makePostRequest(`/users`, { user: { email, password, username } })
            .then((res) => {
                dispatch({ type: UserActionTypes.AUTH_SUCCESS, payload: res.data.user });
                history.push('/home');
            })
            .catch((err) =>
                dispatch({
                    type: UserActionTypes.AUTH_FAIL,
                    payload: err,
                })
            );
    };

export const signInUser =
    (history: History, { email, password }: SignInData) =>
    async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.TRY_AUTH });
        makePostRequest(`/users/login`, { user: { email, password } })
            .then((res) => {
                dispatch({ type: UserActionTypes.AUTH_SUCCESS, payload: res.data.user });
                history.push('/home');
            })
            .catch((err) =>
                dispatch({
                    type: UserActionTypes.AUTH_FAIL,
                    payload: err,
                })
            );
    };

export const updateUser =
    (history: History, { username, email, bio }: Record<string, string | null>) =>
    async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.TRY_AUTH });
        makePutRequest(`/user`, { user: { username, email, bio } }, true)
            .then((res) => {
                dispatch({ type: UserActionTypes.AUTH_SUCCESS, payload: res.data.user });
                history.push('/home');
            })
            .catch((err) =>
                dispatch({
                    type: UserActionTypes.AUTH_FAIL,
                    payload: err,
                })
            );
    };

export const logOutUser = (history: History) => (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.LOGOUT });
    history.push('/signIn');
};
