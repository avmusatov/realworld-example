import { useTypedSelector } from '../hooks/useTypedSelector';
import { useSetActivePage } from '../hooks/useActivePage';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ArticleList from './articleList';

const Home = () => {
    const { user } = useTypedSelector((state) => state.user);
    const setActivePage = useSetActivePage();

    useEffect(() => {
        setActivePage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className="home">
            <h5>Hello, {user && user.username}</h5>
            <br />
            <ArticleList />
        </Container>
    );
};

export default Home;
