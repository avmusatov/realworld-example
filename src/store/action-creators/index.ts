import * as pageActionCreators from './page';
import * as userActionCreators from './user';

export const actionCreators = { ...pageActionCreators, ...userActionCreators };
