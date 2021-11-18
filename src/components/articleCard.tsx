import { IArticle, Comment } from '../store/types/articleTypes';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import { useState } from 'react';

interface CommentSectionProps {
    comments: Comment[];
    close: () => void;
}

const CommentSection = ({ comments, close }: CommentSectionProps) => {
    const [inputValue, setInputValue] = useState<string>('');

    return (
        <Card.Body>
            <h5>Comments</h5>
            <ListGroup>
                {comments.map(({ body, id }) => (
                    <ListGroup.Item key={id} disabled>
                        {body}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Form.Group className="mt-3">
                <Form.Label>Leave a comment!</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Leave your comment"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button className="me-3" variant="success">
                    Send
                </Button>
                <Button onClick={close} variant="secondary">
                    Cancel
                </Button>
            </Form.Group>
        </Card.Body>
    );
};

interface Props {
    article: IArticle;
}

const ArticleCard = ({ article }: Props) => {
    const { title, description, body, comments, author } = article;

    const [commentsIsVisible, setCommentsIsVisible] = useState<boolean>(false);

    return (
        <Card bg={'light'} className="mb-5" style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
                <Card.Text>{body}</Card.Text>
                <footer className="blockquote-footer">{author.username}</footer>
                <Button onClick={() => setCommentsIsVisible((x) => !x)} disabled={comments.length === 0} variant="info">
                    {commentsIsVisible ? 'Hide comments' : 'Show comments'}
                </Button>
            </Card.Body>
            {commentsIsVisible && <CommentSection comments={comments} close={() => setCommentsIsVisible(false)} />}
        </Card>
    );
};

export default ArticleCard;
