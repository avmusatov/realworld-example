import { Formik } from 'formik';
import * as yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSetActivePage } from '../hooks/useActivePage';
import { Container, Form, Button } from 'react-bootstrap';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

const User = () => {
    const setActivePage = useSetActivePage();
    useEffect(() => void setActivePage(), [setActivePage]);
    const history = useHistory();
    const { updateUser } = useActions();
    const { t } = useTranslation();

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                username: yup.string().required(t('validation.required')).min(3, t('validation.min3')),
                email: yup.string().email(t('validation.email')).required(t('validation.required')),
            }),
        [t]
    );

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
                        <h2 className="text-center">{t('user.title')}</h2>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="username">{t('user.editUsername')}</Form.Label>
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
                            <Form.Label htmlFor="email">{t('user.editEmail')}</Form.Label>
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
                            <Form.Label htmlFor="bio">{t('user.editBio')}</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={bio || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="bio"
                                id="bio"
                                placeholder={t('placeholders.bio')}
                            />
                            {touched.bio && errors.bio && <Form.Text className="text-danger ">{errors.bio}</Form.Text>}
                        </Form.Group>
                        <Button variant="success" disabled={!isValid} type="submit" onClick={() => handleSubmit()}>
                            {t('user.save')}
                        </Button>
                    </Container>
                );
            }}
        </Formik>
    );
};

export default User;
