import { Container } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import NavigationMenu from './navigation';
import Home from './home';
import SignIn from './signIn';
import SignUp from './signUp';
import Spinner from './spinner';
import Edit from './edit';
import ErrorIndicator from './errorIndicator';
import User from './user';

const App = () => {
    const { user, loading, error } = useTypedSelector((state) => state.user);

    if (loading) return <Spinner />;
    if (error) return <ErrorIndicator err={error} />;

    return (
        <Container>
            <NavigationMenu />
            <Switch>
                <Route path="/signIn" component={SignIn} />
                <Route path="/signUp" component={SignUp} />
                {!user && <Redirect to="/signIn" />}
                <Route path="/">
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/edit" component={Edit} />
                        <Route path="/user" component={User} />
                        <Redirect to="/home" />
                    </Switch>
                </Route>
            </Switch>
        </Container>
    );
};

export default App;
