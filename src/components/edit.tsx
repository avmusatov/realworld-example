import { useCallback, useEffect, useState } from 'react';
import { useSetActivePage } from '../hooks/useActivePage';
import * as yup from 'yup';
import { Formik } from 'formik';
import { CreateArticleData } from '../store/types/articleTypes';
import { Button, Container, Form } from 'react-bootstrap';
import { makePostRequest } from '../helpers/requests';
import MultiSelect, { IOrderedOption } from './multiselect/multiselect';

const initialFormValues: CreateArticleData = {
    title: '',
    description: '',
    body: '',
};

const validationSchema = yup.object().shape({
    title: yup.string().required('Required').min(3, 'Write at least 3 symbols').max(150),
    description: yup.string().required('Required').min(3, 'Write at least 3 symbols').max(300),
    body: yup.string().required('Required').max(1000),
});

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

    const setActivePage = useSetActivePage();
    useEffect(() => void setActivePage(), [setActivePage]);

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
                        <h2 className="text-center">Write your own article!</h2>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control
                                value={title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="title"
                                id="title"
                                placeholder="Enter the title of your article"
                            />
                            {touched.title && errors.title && (
                                <Form.Text className="text-danger ">{errors.title}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="description"
                                id="description"
                                placeholder="Enter the description of your article"
                            />
                            {touched.description && errors.description && (
                                <Form.Text className="text-danger ">{errors.description}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={body}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="body"
                                id="body"
                                placeholder="Enter the body of your article"
                            />
                            {touched.body && errors.body && (
                                <Form.Text className="text-danger ">{errors.body}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tags</Form.Label>
                            <MultiSelect
                                selectedOptions={selectedTags}
                                updateSelectedOptions={setSelectedTags}
                                options={tagVariants}
                            />
                        </Form.Group>
                        <Button
                            className="mt-3 mb-3"
                            variant="success"
                            disabled={!isValid}
                            type="submit"
                            onClick={() => handleSubmit()}
                        >
                            Post the article
                        </Button>
                        {articlePosted && <h6 className="text-success">Your article has succesfully posted!</h6>}
                    </Container>
                );
            }}
        </Formik>
    );
};

export default Edit;
