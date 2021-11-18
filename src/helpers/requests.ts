import axios from 'axios';
import { getItem } from './localStorage';

const { token } = getItem('user');
const _apiBase = 'https://api.realworld.io/api';
const commonHeaders: any = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
};

const addAuthHeader = (headers: any, token: string) => ({ ...headers, Authorization: `Token ${token}` });

export const makePostRequest = async (path: string, body: any, withAuth?: boolean) =>
    await axios.post(`${_apiBase}${path}`, body, {
        headers: withAuth && token ? addAuthHeader(commonHeaders, token) : commonHeaders,
    });

export const makeGetRequest = async (path: string, withAuth?: boolean) =>
    await axios.get(`${_apiBase}${path}`, {
        headers: withAuth && token ? addAuthHeader(commonHeaders, token) : commonHeaders,
    });

export const makePutRequest = async (path: string, body: any, withAuth?: boolean) =>
    await axios.put(`${_apiBase}${path}`, body, {
        headers: withAuth && token ? addAuthHeader(commonHeaders, token) : commonHeaders,
    });
