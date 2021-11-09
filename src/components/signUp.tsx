import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useActions } from '../store/hooks/useActions';
import Button from './button';
import Input from './input';

const SignUp = () => {
    const { signUpUser } = useActions();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    return (
        <div className="sign-up">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} name="username" label="Username" />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} name="email" label="Email" />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                label="Password"
            />
            <Button
                label="Sign Up"
                onClick={() => {
                    signUpUser({ email, username, password });
                    history.push('/home');
                }}
            />
            <br />
            <Link to="/signIn"> Back to login </Link>
        </div>
    );
};

export default SignUp;
