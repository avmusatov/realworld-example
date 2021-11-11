import { useHistory } from 'react-router';
import { useActions } from './useActions';

export const useLogOut = () => {
    const history = useHistory();
    const { logOutUser, resetActivePage } = useActions();

    return () => {
        resetActivePage();
        logOutUser(history);
    };
};
