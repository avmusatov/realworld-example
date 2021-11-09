import axios from 'axios';
import { Dispatch } from 'redux';
import { SignUpData, UserAction, UserActionTypes } from '../types/userTypes';

const _apiBase = 'https://api.realworld.io/api';

export const signUpUser =
    ({ email, password, username }: SignUpData) =>
    async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.TRY_SIGN_UP });
        axios
            .post(`${_apiBase}/users`, { user: { email, password, username } })
            .then((res) => dispatch({ type: UserActionTypes.SIGN_UP_SUCCESS, payload: res.data.user }))
            .catch((err) =>
                dispatch({
                    type: UserActionTypes.SIGN_UP_FAIL,
                    payload: `Sometrhing went wrong with error: ${String(err)}`,
                })
            );
    };
