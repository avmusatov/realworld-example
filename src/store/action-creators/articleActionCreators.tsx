import { Dispatch } from 'redux';
import { makeGetRequest } from '../../helpers/requests';
import { ArticleAction, ArticleActionTypes } from '../types/articleTypes';

export const fetchArticles = () => async (dispatch: Dispatch<ArticleAction>) => {
    dispatch({ type: ArticleActionTypes.TRY_FETCH_ARTICLES });
    makeGetRequest(`/articles`, true)
        .then((res) => {
            dispatch({ type: ArticleActionTypes.FETCH_ARTICLES_SUCCESS, payload: res.data.articles });
        })
        .catch((err) =>
            dispatch({
                type: ArticleActionTypes.FETCH_ARTICLES_FAIL,
                payload: err,
            })
        );
};
