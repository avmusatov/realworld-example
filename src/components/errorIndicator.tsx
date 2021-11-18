import { Alert } from 'react-bootstrap';
import { useLogOut } from '../hooks/useLogOut';

interface Props {
    err: Error;
}

const ErrorIndicator = ({ err }: Props) => {
    const logOut = useLogOut();

    return (
        <Alert variant="danger" onClose={() => logOut()} dismissible>
            <Alert.Heading>{err.name}</Alert.Heading>
            <p>{err.message}</p>
        </Alert>
    );
};

export default ErrorIndicator;
