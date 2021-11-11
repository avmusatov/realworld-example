import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Button, Container } from 'react-bootstrap';

import { useActions } from '../store/hooks/useActions';
import { SignUpData } from '../store/types/userTypes';

const initialFormValues: SignUpData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const validationSchema = yup.object().shape({
    username: yup.string().required('Required').min(5, 'Minimal length is 5'),
    email: yup.string().email('Enter a correct email address').required('Required'),
    password: yup.string().required('Required').min(3, 'Minimal length is 3'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Password mismatch')
        .required('Required'),
});

const SignUp = () => {
    const { signUpUser } = useActions();
    const history = useHistory();

    return (
        <Formik
            initialValues={initialFormValues}
            validateOnBlur
            onSubmit={(values) => void signUpUser(history, values)}
            validationSchema={validationSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit }) => {
                const { username, email, password, confirmPassword } = values;
                return (
                    <Container className="sign-up">
                        <h1>Welcome, to Real World!</h1>
                        <h2 className="mb-5 text-muted">Please, sign up</h2>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="username">Username</Form.Label>
                            <Form.Control
                                value={username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="username"
                                id="username"
                                placeholder="Enter username"
                            />
                            {touched.username && errors.username && (
                                <Form.Text className="text-danger ">{errors.username}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                id="email"
                                placeholder="Enter email"
                            />
                            {touched.email && errors.email && (
                                <Form.Text className="text-danger ">{errors.email}</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                type="password"
                                id="password"
                                placeholder="Enter password"
                            />
                            {touched.password && errors.password && (
                                <Form.Text className="text-danger ">{errors.password}</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="confirmPassword">Password confirmation</Form.Label>
                            <Form.Control
                                value={confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="confirmPassword"
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm password"
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <Form.Text className="text-danger ">{errors.confirmPassword}</Form.Text>
                            )}
                        </Form.Group>

                        <Button variant="success" disabled={!isValid} type="submit" onClick={() => handleSubmit()}>
                            Sign Up
                        </Button>
                        <br />
                        <Link to="/signIn"> Back to login </Link>
                    </Container>
                );
            }}
        </Formik>
    );
};

export default SignUp;
