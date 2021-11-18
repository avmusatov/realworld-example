import { PageAction, PageActionTypes, PageState } from "../types/pageTypes";

const initialState: PageState = {
    activePage: '',
};

export const pageReducer = (state = initialState, action: PageAction): PageState => {
    switch (action.type) {
        case PageActionTypes.SET_ACTIVE_PAGE:
            return { activePage: action.payload };

        case PageActionTypes.RESET_ACTIVE_PAGE:
            return initialState;

        default:
            return state;
    }
};
