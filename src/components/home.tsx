import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useActions } from '../store/hooks/useActions';
import { useTypedSelector } from '../store/hooks/useTypedSelector';

const Home = () => {
    const history = useHistory();
    const { logOutUser } = useActions();
    const { user } = useTypedSelector((state) => state.user);

    return (
        <div className="home">
            <span>Hello, {user ? user.username : 'stranger'}</span>
            <br />
            <Button variant="primary" onClick={() => void logOutUser(history)}>
                Log out
            </Button>
        </div>
    );
};

export default Home;
