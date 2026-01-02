import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// POST request to login
export const loginUser = (email, password) => {
    return API.post('/auth/login', { email, password });

};
