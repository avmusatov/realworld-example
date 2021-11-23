import axios from 'axios';
import { getItem } from './localStorage';

const _apiBase = 'https://api.realworld.io/api';

type Headers = Record<string, string>;

const commonHeaders: Headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
};

const getToken = (): string | null => {
    const user = getItem('user');
    return user ? user.token : null;
};

const addAuthHeader = (headers: Headers, token: string): Headers => ({ ...headers, Authorization: `Token ${token}` });

export const makePostRequest = async (path: string, body: object, withAuth?: boolean): Promise<any> => {
    const token = getToken();
    return await axios.post(`${_apiBase}${path}`, body, {
        headers: withAuth && token ? addAuthHeader(commonHeaders, token) : commonHeaders,
    });
};

export const makeGetRequest = async (path: string, withAuth?: boolean): Promise<any> => {
    const token = getToken();
    return await axios.get(`${_apiBase}${path}`, {
        headers: withAuth && token ? addAuthHeader(commonHeaders, token) : commonHeaders,
    });
};

export const makePutRequest = async (path: string, body: object, withAuth?: boolean): Promise<any> => {
    const token = getToken();
    return await axios.put(`${_apiBase}${path}`, body, {
        headers: withAuth && token ? addAuthHeader(commonHeaders, token) : commonHeaders,
    });
};

export const makeDeleteRequest = async (path: string, withAuth?: boolean): Promise<any> => {
    const token = getToken();
    return await axios.delete(`${_apiBase}${path}`, {
        headers: withAuth && token ? addAuthHeader(commonHeaders, token) : commonHeaders,
    });
};
