import { Dispatch } from 'redux';
import { SignUpData, SignInData, UserAction, UserActionTypes } from '../types/userTypes';
import { makePostRequest } from '../../helpers/requests';

export const signUpUser =
    ({ email, password, username }: SignUpData) =>
    async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.TRY_AUTH });
        makePostRequest(`/users`, { user: { email, password, username } })
            .then((res) => dispatch({ type: UserActionTypes.AUTH_SUCCESS, payload: res.data.user }))
            .catch((err) =>
                dispatch({
                    type: UserActionTypes.AUTH_FAIL,
                    payload: `Sometrhing went wrong while trying signing up with error: ${String(err)}`,
                })
            );
    };

export const signInUser =
    ({ email, password }: SignInData) =>
    async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.TRY_AUTH });
        makePostRequest(`/users/login`, { user: { email, password } })
            .then((res) => dispatch({ type: UserActionTypes.AUTH_SUCCESS, payload: res.data.user }))
            .catch((err) =>
                dispatch({
                    type: UserActionTypes.AUTH_FAIL,
                    payload: `Sometrhing went wrong while trying signing in with error: ${String(err)}`,
                })
            );
    };

export const logOutUser = () => (dispatch: Dispatch<UserAction>) => dispatch({ type: UserActionTypes.LOGOUT });