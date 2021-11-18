import { Dispatch } from 'redux';
import { History } from 'history';
import { PageAction, PageActionTypes } from '../types/pageTypes';

export const setActivePage = (history: History) => (dispatch: Dispatch<PageAction>) => {
    dispatch({ type: PageActionTypes.SET_ACTIVE_PAGE, payload: history.location.pathname });
};

export const resetActivePage = () => (dispatch: Dispatch<PageAction>) => {
    dispatch({ type: PageActionTypes.RESET_ACTIVE_PAGE });
};
