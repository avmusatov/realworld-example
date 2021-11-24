import { IArticle, Comment } from '../store/types/articleTypes';
import { Badge, Button, Card, Form, ListGroup } from 'react-bootstrap';
import { useCallback, useState } from 'react';
import { makeDeleteRequest, makePostRequest } from '../helpers/requests';
import Icon from './multiselect/icon';
import { useActions } from '../hooks/useActions';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../helpers/format';

interface CommentSectionProps {
    slug: string;
    comments: Comment[];
    close: () => void;
}

const CommentSection = ({ slug, comments, close }: CommentSectionProps) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [commentList, setCommentList] = useState<Comment[]>(comments);
    const { t } = useTranslation();

    const postComment = useCallback((slug: string, inputValue) => {
        setInputValue('');
        makePostRequest(`/articles/${slug}/comments`, { comment: { body: inputValue } }, true).then((res) =>
            setCommentList((commentList) => [...commentList, res.data.comment])
        );
    }, []);

    return (
        <Card.Body>
            <h5>{t('comment.title')}</h5>
            {commentList.length > 0 ? (
                <ListGroup variant="flush">
                    {commentList.map(({ author, body, id }) => (
                        <ListGroup.Item key={id} className="d-flex justify-content-between align-items-start">
                            <span>{body}</span>
                            <span className="text-secondary">{author.username}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <span>{t('comment.noComments')}</span>
            )}
            <Form.Group className="mt-3">
                <Form.Label>{t('comment.leaveComment')}</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder={t('placeholders.leaveComment')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button onClick={() => postComment(slug, inputValue)} className="me-3" variant="success">
                    {t('comment.submit')}
                </Button>
                <Button onClick={close} variant="secondary">
                    {t('comment.cancel')}
                </Button>
            </Form.Group>
        </Card.Body>
    );
};

interface Props {
    article: IArticle;
}

const ArticleCard = ({ article }: Props) => {
    const { fetchArticles } = useActions();
    const { slug, title, description, body, comments, author, tagList, createdAt } = article;
    const [commentsIsVisible, setCommentsIsVisible] = useState<boolean>(false);
    const { i18n, t } = useTranslation();

    const deleteArticle = useCallback(() => {
        makeDeleteRequest(`/articles/${slug}`, true).then(() => fetchArticles());
    }, [slug, fetchArticles]);

    return (
        <Card bg={'light'} className="mb-5" style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title className="d-flex">
                    <span>{title}</span>
                    <span role="button" className="ms-auto">
                        <Icon type="trash" action={() => deleteArticle()} />
                    </span>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
                <Card.Text>{body}</Card.Text>
                <footer className="blockquote-footer">
                    <span>{author.username}</span>
                    <br />
                    <span>{t('article.posted', { date: formatDate(new Date(createdAt), i18n.language) })}</span>
                </footer>
                {tagList.length > 0 && (
                    <div className="mb-3">
                        {tagList.map((tag) => (
                            <Badge className="me-2" key={tag} bg="dark">
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                )}
                <Button onClick={() => setCommentsIsVisible((x) => !x)} variant="info">
                    {commentsIsVisible ? t('article.hideComments') : t('article.showComments')}
                </Button>
            </Card.Body>
            {commentsIsVisible && (
                <CommentSection slug={slug} comments={comments} close={() => setCommentsIsVisible(false)} />
            )}
        </Card>
    );
};

export default ArticleCard;
