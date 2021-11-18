export enum PageActionTypes {
    SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE',
    RESET_ACTIVE_PAGE = 'RESET_ACTIVE_PAGE',
}

export interface PageState {
    activePage: string;
}

export interface PageAction {
    type: keyof typeof PageActionTypes;
    payload?: any;
}