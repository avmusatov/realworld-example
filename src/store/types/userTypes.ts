export enum UserActionTypes {
    TRY_SIGN_UP = 'TRY_SIGN_UP',
    SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
    SIGN_UP_FAIL = 'SIGN_UP_FAIL',
}

export interface IUser {
    email: string;
    username: string;
    bio: null | string;
    image: null | string;
    token: string;
}

export interface UserState {
    user: IUser | null;
    loading: boolean;
    error: null | string;
}

export interface UserAction {
    type: keyof typeof UserActionTypes;
    payload?: any;
}

export interface SignUpData {
    email: string;
    password: string;
    username: string;
}