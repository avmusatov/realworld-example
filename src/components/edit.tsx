import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSetActivePage } from '../hooks/useActivePage';
import * as yup from 'yup';
import { Formik } from 'formik';
import { CreateArticleData } from '../store/types/articleTypes';
import { Button, Container, Form } from 'react-bootstrap';
import { makePostRequest } from '../helpers/requests';
import MultiSelect, { IOrderedOption } from './multiselect/multiselect';
import { useTranslation } from 'react-i18next';

const initialFormValues: CreateArticleData = {
    title: '',
    description: '',
    body: '',
};

const tagVariants = [
    { value: 'Math', label: 'Math' },
    { value: 'Programming', label: 'Programming' },
    { value: 'Bootstrap', label: 'Bootstrap' },
    { value: 'Computer science', label: 'Computer science' },
    { value: 'Real world', label: 'Real world' },
    { value: 'Windows', label: 'Windows' },
    { value: 'Linux', label: 'Linux' },
    { value: 'Hello world', label: 'Hello world' },
];

const Edit = () => {
    const [articlePosted, setArticlePosted] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<IOrderedOption[]>([]);
    const { t } = useTranslation();

    const setActivePage = useSetActivePage();
    useEffect(() => void setActivePage(), [setActivePage]);

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                title: yup.string().required(t('validation.required')).min(3, t('validation.min3')).max(150),
                description: yup.string().required(t('validation.required')).min(3, t('validation.min3')).max(300),
                body: yup.string().required(t('validation.required')).max(1000),
            }),
        [t]
    );

    const postArticle = useCallback(
        (article: CreateArticleData) => {
            const tagList = selectedTags.map(({ value }) => value);
            makePostRequest('/articles', { article: { ...article, tagList } }, true).then(() => setArticlePosted(true));
        },
        [selectedTags]
    );

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            validateOnBlur
            onSubmit={(values, { resetForm }) => {
                postArticle(values);
                resetForm();
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit }) => {
                const { title, description, body } = values;
                return (
                    <Container>
                        <h2 className="text-center">{t('edit.title')}</h2>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="title">{t('edit.articleTitle')}</Form.Label>
                            <Form.Control
                                value={title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="title"
                                id="title"
                                placeholder={t('placeholders.articleTitle')}
                            />
                            {touched.title && errors.title && (
                                <Form.Text className="text-danger ">{errors.title}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">{t('edit.articleDescription')}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="description"
                                id="description"
                                placeholder={t('placeholders.articleDescription')}
                            />
                            {touched.description && errors.description && (
                                <Form.Text className="text-danger ">{errors.description}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">{t('edit.articleBody')}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={body}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="body"
                                id="body"
                                placeholder={t('placeholders.articleBody')}
                            />
                            {touched.body && errors.body && (
                                <Form.Text className="text-danger ">{errors.body}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('edit.articleTags')}</Form.Label>
                            <MultiSelect
                                selectedOptions={selectedTags}
                                updateSelectedOptions={setSelectedTags}
                                options={tagVariants}
                                placeholder={t('placeholders.selectTags')}
                            />
                        </Form.Group>
                        <Button
                            className="mt-3 mb-3"
                            variant="success"
                            disabled={!isValid}
                            type="submit"
                            onClick={() => handleSubmit()}
                        >
                            {t('edit.postArticle')}
                        </Button>
                        {articlePosted && <h6 className="text-success">{t('edit.successMessage')}</h6>}
                    </Container>
                );
            }}
        </Formik>
    );
};

export default Edit;
