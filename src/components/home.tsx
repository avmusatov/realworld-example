import { useSetActivePage } from '../hooks/useActivePage';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ArticleList from './articleList';

const Home = () => {
    const setActivePage = useSetActivePage();

    useEffect(() => {
        setActivePage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className="home">
            <h2 className="text-center">All articles</h2>
            <br />
            <ArticleList />
        </Container>
    );
};

export default Home;
