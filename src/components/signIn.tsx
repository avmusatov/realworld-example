import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useActions } from '../store/hooks/useActions';
import { SignInData } from '../store/types/userTypes';

const initialFormValues: SignInData = {
    email: '',
    password: '',
};

const validationSchema = yup.object().shape({
    email: yup.string().email('Enter a correct email address').required('Required'),
    password: yup.string().required('Required').min(3, 'Minimal length is 3'),
});

const SignIn = () => {
    const history = useHistory();
    const { signInUser } = useActions();

    return (
        <Formik
            initialValues={initialFormValues}
            validateOnBlur
            onSubmit={(values) => void signInUser(history, values)}
            validationSchema={validationSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit }) => {
                const { email, password } = values;
                return (
                    <Container className="sign-up">
                        <h1 >Welcome, to Real World!</h1>
                        <h2 className="mb-5 text-muted">Please, sign in</h2>
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
                        <Button variant="success" disabled={!isValid} type="submit" onClick={() => handleSubmit()}>
                            Sign In
                        </Button>
                        <br />
                        <Link to="/signUp"> Create an account </Link>
                    </Container>
                );
            }}
        </Formik>
    );
};

export default SignIn;
