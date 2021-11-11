import { useEffect } from 'react';
import { useSetActivePage } from '../hooks/useActivePage';

const Edit = () => {
    const setActivePage = useSetActivePage();

    useEffect(setActivePage, [setActivePage]);

    return <div>Edit page!</div>;
};

export default Edit;
