export enum ArticleActionTypes {
    TRY_FETCH_ARTICLES = 'TRY_FETCH_ARTICLES',
    FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS',
    FETCH_ARTICLES_FAIL = 'FETCH_ARTICLES_FAIL',
}

export type Author = {
    username: string;
    bio: string;
    image: string;
    following?: boolean;
};

export type Comment = {
    id: number;
    createdAt: string;
    udpatedAt: string;
    body: string;
    author: Author;
};

export interface IArticle {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    udpatedAt: string;
    tagList: string[];
    author: Author;
    comments: Comment[];
    favoritesCount: number;
    favorited: boolean;
}

export interface CreateArticleData {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
}

export interface ArticleState {
    loading: boolean;
    articleList: IArticle[];
    error: Error | null;
}

export interface ArticleAction {
    type: keyof typeof ArticleActionTypes;
    payload?: any;
}
