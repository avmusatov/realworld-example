import { useTypedSelector } from '../hooks/useTypedSelector';
import { useEffect } from 'react';
import { useSetActivePage } from '../hooks/useActivePage';

const Home = () => {
    const { user } = useTypedSelector((state) => state.user);
    const setActivePage = useSetActivePage();

    useEffect(setActivePage, [setActivePage]);

    return (
        <div className="home">
            <span>Hello, {user ? user.username : 'stranger'}</span>
            <br />
        </div>
    );
};

export default Home;
