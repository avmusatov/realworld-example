import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../store/action-creators/user';
import { useTypedSelector } from '../store/hooks/useTypedSelector';

function App() {
    const { user, loading, error } = useTypedSelector((state) => state.user);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    console.log(`user: ${user}; loading: ${loading}; error: ${error}`);

    if (loading) return <p>Loading....</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <div className="sign-up">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="email"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => dispatch(signUpUser({ email, username, password }))}
                >
                    Sign Up
                </button>
            </div>
            {user ? <p>Hello, {user.username}</p> : <p>Hello, stranger</p>}
        </div>
    );
}

export default App;
