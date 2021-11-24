import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { SignInData } from '../store/types/userTypes';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const initialFormValues: SignInData = {
    email: '',
    password: '',
};

const SignIn = () => {
    const history = useHistory();
    const { signInUser } = useActions();
    const { t } = useTranslation();

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                email: yup.string().email(t('validation.email')).required(t('validation.required')),
                password: yup.string().required(t('validation.required')).min(3, t('validation.min3')),
            }),
        [t]
    );

    return (
        <Formik
            initialValues={initialFormValues}
            validateOnChange
            onSubmit={(values) => void signInUser(history, values)}
            validationSchema={validationSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit }) => {
                const { email, password } = values;
                return (
                    <Container className="auth-form">
                        <h1>{t('auth.title')}</h1>
                        <h2 className="mb-5 text-muted">{t('auth.signInSubtitle')}</h2>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">{t('auth.email')}</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                id="email"
                                placeholder={t("placeholders.email")}
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
                                placeholder={t("placeholders.password")}
                            />
                            {touched.password && errors.password && (
                                <Form.Text className="text-danger ">{errors.password}</Form.Text>
                            )}
                        </Form.Group>
                        <Button variant="success" disabled={!isValid} type="submit" onClick={() => handleSubmit()}>
                            {t('auth.signIn')}
                        </Button>
                        <br />
                        <Link className="d-flex justify-content-center" to="/signUp">{t('auth.toSignUp')}</Link>
                    </Container>
                );
            }}
        </Formik>
    );
};

export default SignIn;
