import * as pageActionCreators from './pageActionCreators';
import * as userActionCreators from './userActionCreators';
import * as articleActionCreators from './articleActionCreators';

export const actionCreators = { ...pageActionCreators, ...userActionCreators, ...articleActionCreators };
