import { ArticleAction, ArticleActionTypes, ArticleState } from "../types/articleTypes";

const initialState: ArticleState = {
    loading: false,
    articleList: [],  
    error: null,
};

export const articleReducer = (state = initialState, action: ArticleAction): ArticleState => {
    switch (action.type) {
        case ArticleActionTypes.TRY_FETCH_ARTICLES:
            return { loading: true, articleList: [], error: null };

        case ArticleActionTypes.FETCH_ARTICLES_SUCCESS:
            return { loading: false, articleList: action.payload, error: null };

        case ArticleActionTypes.FETCH_ARTICLES_FAIL:
            return { loading: false, articleList: [], error: action.payload };

        default:
            return state;
    }
};
