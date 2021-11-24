import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useActions } from '../hooks/useActions';
import { SignUpData } from '../store/types/userTypes';
import { useMemo } from 'react';

const initialFormValues: SignUpData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUp = () => {
    const { signUpUser } = useActions();
    const history = useHistory();
    const { t } = useTranslation();

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                username: yup.string().required(t('validation.required')).min(3, t('validation.min3')),
                email: yup.string().email(t('validation.email')).required(t('validation.required')),
                password: yup.string().required(t('validation.required')).min(3, t('validation.min3')),
                confirmPassword: yup
                    .string()
                    .oneOf([yup.ref('password')], t('validation.passwordMismatch'))
                    .required(t('validation.required')),
            }),
        [t]
    );

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
                    <Container className="auth-form">
                        <h1>{t('auth.title')}</h1>
                        <h2 className="mb-5 text-muted">{t('auth.signUpSubtitle')}</h2>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="username">{t('auth.username')}</Form.Label>
                            <Form.Control
                                value={username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="username"
                                id="username"
                                placeholder={t('placeholders.username')}
                            />
                            {touched.username && errors.username && (
                                <Form.Text className="text-danger ">{errors.username}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">{t('auth.email')}</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                id="email"
                                placeholder={t('placeholders.email')}
                            />
                            {touched.email && errors.email && (
                                <Form.Text className="text-danger ">{errors.email}</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">{t('auth.password')}</Form.Label>
                            <Form.Control
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                type="password"
                                id="password"
                                placeholder={t('placeholders.password')}
                            />
                            {touched.password && errors.password && (
                                <Form.Text className="text-danger ">{errors.password}</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Form.Label>
                            <Form.Control
                                value={confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="confirmPassword"
                                type="password"
                                id="confirmPassword"
                                placeholder={t('placeholders.confirmPassword')}
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <Form.Text className="text-danger ">{errors.confirmPassword}</Form.Text>
                            )}
                        </Form.Group>

                        <Button variant="success" disabled={!isValid} type="submit" onClick={() => handleSubmit()}>
                            {t('auth.signUp')}
                        </Button>
                        <br />
                        <Link className="d-flex justify-content-center" to="/signIn">
                            {t('auth.toSignIn')}
                        </Link>
                    </Container>
                );
            }}
        </Formik>
    );
};

export default SignUp;
