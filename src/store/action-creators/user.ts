import { Dispatch } from 'redux';
import { SignUpData, SignInData, UserAction, UserActionTypes } from '../types/userTypes';
import { makePostRequest } from '../../helpers/requests';
import { History } from "history";

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
                    payload: `Sometrhing went wrong while trying signing up with error: ${String(err)}`,
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
                    payload: `Sometrhing went wrong while trying signing in with error: ${String(err)}`,
                })
            );
    };

export const logOutUser = (history: History) => (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.LOGOUT });
    history.push('/signIn');
};
