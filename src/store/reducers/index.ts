import { combineReducers } from 'redux';
import { pageReducer } from './pageReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    page: pageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
