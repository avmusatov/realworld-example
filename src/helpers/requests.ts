import axios from 'axios';

const _apiBase = 'https://api.realworld.io/api';
const commonHeaders: any = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
};

const addAuthHeader = (headers: any, token: string) => ({ ...headers, Authorization: `Token ${token}` });

export const makePostRequest = async (path: string, body: any, token?: string) =>
    await axios.post(`${_apiBase}${path}`, body, {
        headers: token ? addAuthHeader(commonHeaders, token) : commonHeaders,
    });

export const makeGetRequest = async (path: string, token?: string) =>
    await axios.get(`${_apiBase}${path}`, { headers: token ? addAuthHeader(commonHeaders, token) : commonHeaders });

export const makePutRequest = async (path: string, body: any, token?: string) =>
    await axios.put(`${_apiBase}${path}`, body, {
        headers: token ? addAuthHeader(commonHeaders, token) : commonHeaders,
    });
