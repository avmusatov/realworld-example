export enum UserActionTypes {
    TRY_AUTH = 'TRY_AUTH',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAIL = 'AUTH_FAIL',
    LOGOUT = 'LOGOUT',
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

export interface SignInData {
    email: string;
    password: string;
}

export interface SignUpData extends SignInData {
    username: string;
    confirmPassword: string;
}
