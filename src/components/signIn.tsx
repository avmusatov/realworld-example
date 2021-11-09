import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useActions } from '../store/hooks/useActions';
import Button from './button';
import Input from './input';

const SignIn = () => {
    const history = useHistory();
    const { signInUser } = useActions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="sign-up">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} name="email" label="Email" />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                label="Password"
            />
            <Button
                label="Sign In"
                onClick={() => {
                    signInUser({ email, password });
                    history.push('/home');
                }}
            />
            <br />
            <Link to="/signUp"> Create an account </Link>
        </div>
    );
};

export default SignIn;
