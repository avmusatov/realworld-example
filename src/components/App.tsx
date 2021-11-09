import { Redirect, Route, Switch } from 'react-router-dom';
import { useTypedSelector } from '../store/hooks/useTypedSelector';
import Home from './home';
import SignIn from './signIn';
import SignUp from './signUp';
import Spinner from './spinner';

const App = () => {
    const { user, loading, error } = useTypedSelector((state) => state.user);
    console.log(user);

    if (loading) return <Spinner />;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <Switch>
                <Route path="/signIn" component={SignIn} />
                <Route path="/signUp" component={SignUp} />
                {!user && <Redirect to="/signIn" />}
                <Route path="/">
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Redirect to="/home" />
                    </Switch>
                </Route>
            </Switch>
        </div>
    );
};

export default App;
