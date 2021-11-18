import ErrorIndicator from './errorIndicator';
import Spinner from './spinner';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import ArticleCard from './articleCard';

const ArticleList = () => {
    const { loading, articleList, error } = useTypedSelector((state) => state.article);
    const { fetchArticles } = useActions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => void fetchArticles(), []);

    if (loading) return <Spinner />;
    if (error) return <ErrorIndicator err={error} />;

    return (
        <>
            {articleList.map((article) => (
                <ArticleCard key={article.createdAt} article={article} />
            ))}
        </>
    );
};

export default ArticleList;
