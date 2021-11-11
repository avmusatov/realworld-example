interface PageState {
    activePage: string;
}

export enum PageActionTypes {
    SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE',
    RESET_ACTIVE_PAGE = 'RESET_ACTIVE_PAGE',
}

export interface PageAction {
    type: keyof typeof PageActionTypes;
    payload?: any;
}

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
