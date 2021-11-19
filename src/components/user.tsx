import { Formik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useSetActivePage } from '../hooks/useActivePage';
import { Container, Form, Button } from 'react-bootstrap';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { useHistory } from 'react-router';

const validationSchema = yup.object().shape({
    username: yup.string().required('Required').min(5, 'Minimal length is 5'),
    email: yup.string().email('Enter a correct email address').required('Required'),
});

const User = () => {
    const setActivePage = useSetActivePage();
    useEffect(() => void setActivePage(), [setActivePage]);
    const history = useHistory();
    const { updateUser } = useActions();

    const { user } = useTypedSelector((state) => state.user);
    if (!user) return null;

    const initialFormValues = user && {
        email: user.email,
        username: user.username,
        bio: user.bio,
    };

    return (
        <Formik
            initialValues={initialFormValues}
            validateOnBlur
            onSubmit={(values) => void updateUser(history, values)}
            validationSchema={validationSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit }) => {
                const { username, email, bio } = values;
                return (
                    <Container>
                        <h2 className="text-center">Edit personal info</h2>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="username">Edit username</Form.Label>
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
                            <Form.Label htmlFor="email">Edit email</Form.Label>
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
                            <Form.Label htmlFor="bio">Edit bio</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={bio || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="bio"
                                id="bio"
                                placeholder="Enter bio"
                            />
                            {touched.bio && errors.bio && <Form.Text className="text-danger ">{errors.bio}</Form.Text>}
                        </Form.Group>
                        <Button variant="success" disabled={!isValid} type="submit" onClick={() => handleSubmit()}>
                            Save changes
                        </Button>
                    </Container>
                );
            }}
        </Formik>
    );
};

export default User;
