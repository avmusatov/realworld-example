import { useSetActivePage } from '../hooks/useActivePage';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ArticleCard from './articleCard';
import { useTypedSelector } from '../hooks/useTypedSelector';
import ErrorIndicator from './errorIndicator';
import { useActions } from '../hooks/useActions';
import Spinner from './spinner';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const setActivePage = useSetActivePage();
    const { loading, articleList, error } = useTypedSelector((state) => state.article);
    const { fetchArticles } = useActions();
    const { t } = useTranslation();

    useEffect(() => {
        fetchArticles();
        setActivePage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <Spinner />;
    if (error) return <ErrorIndicator err={error} />;

    return (
        <Container className="home">
            <h2 className="text-center">{t('home.title')}</h2>
            <br />
            {articleList.length > 0 ? (
                articleList.map((article) => <ArticleCard key={article.createdAt} article={article} />)
            ) : (
                <h5 className="text-info">{t('home.noArticles')}</h5>
            )}
        </Container>
    );
};

export default Home;
