import { useHistory } from 'react-router';
import { useActions } from './useActions';

export const useSetActivePage = () => {
    const history = useHistory();
    const { setActivePage } = useActions();

    return () => void setActivePage(history);
};
