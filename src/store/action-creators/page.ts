import { Dispatch } from 'redux';
import { PageAction, PageActionTypes } from '../reducers/pageReducer';
import { History } from 'history';

export const setActivePage = (history: History) => (dispatch: Dispatch<PageAction>) => {
    dispatch({ type: PageActionTypes.SET_ACTIVE_PAGE, payload: history.location.pathname });
};

export const resetActivePage = () => (dispatch: Dispatch<PageAction>) => {
    dispatch({ type: PageActionTypes.RESET_ACTIVE_PAGE });
};
