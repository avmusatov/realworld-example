import { getItem, removeItem, setItem } from '../../helpers/localStorage';
import { UserState, UserAction, UserActionTypes } from '../types/userTypes';

const user = getItem('user');

const initialState: UserState = {
    loading: false,
    user: user,
    error: null,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.TRY_AUTH:
            return { loading: true, user: null, error: null };

        case UserActionTypes.AUTH_SUCCESS:
            const user = action.payload;
            setItem('user', user);
            return { loading: false, user, error: null };

        case UserActionTypes.AUTH_FAIL:
            return { loading: false, user: null, error: action.payload };

        case UserActionTypes.LOGOUT:
            removeItem('user');
            return initialState;

        default:
            return state;
    }
};
