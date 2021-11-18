import { combineReducers } from 'redux';
import { pageReducer } from './pageReducer';
import { userReducer } from './userReducer';
import { articleReducer } from './articleReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    page: pageReducer,
    article: articleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
