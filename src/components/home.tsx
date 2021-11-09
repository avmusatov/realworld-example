import { useHistory } from 'react-router';
import { useActions } from '../store/hooks/useActions';
import { useTypedSelector } from '../store/hooks/useTypedSelector';
import Button from './button';

const Home = () => {
    const history = useHistory();
    const { logOutUser } = useActions();
    const { user } = useTypedSelector((state) => state.user);

    return (
        <div className="home">
            <span>Hello, {user ? user.username : 'stranger'}</span>
            <br />
            <Button
                label="Log out"
                onClick={() => {
                    logOutUser();
                    history.push('/signIn');
                }}
            />
        </div>
    );
};

export default Home;
