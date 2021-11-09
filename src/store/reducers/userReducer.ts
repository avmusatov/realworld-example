import { UserState, UserAction, UserActionTypes } from '../types/userTypes';

const initialState: UserState = {
    loading: false,
    user: null,
    error: null,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
    console.log(action);
    switch (action.type) {
        case UserActionTypes.TRY_SIGN_UP:
            console.log(`DISPATCH ${UserActionTypes.TRY_SIGN_UP}`);
            return { loading: true, user: null, error: null };

        case UserActionTypes.SIGN_UP_SUCCESS:
            console.log(`DISPATCH ${UserActionTypes.SIGN_UP_SUCCESS}`);
            return { loading: false, user: action.payload, error: null };

        case UserActionTypes.SIGN_UP_FAIL:
            console.log(`DISPATCH ${UserActionTypes.SIGN_UP_FAIL}`);
            return { loading: false, user: null, error: action.payload };
        default:
            return state;
    }
};
