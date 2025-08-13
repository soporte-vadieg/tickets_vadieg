import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.44:5000/api';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error.response?.data || 'An error occurred during login.';
    }
};
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error.response?.data || 'An error occurred during registration.';
    }
};
export const getUsers = async () => {
    const response = await axios.get('http://192.168.1.44:5000/api/users');
    return response.data;
};
export const getAreas = async () => {
    const response = await axios.get('http://192.168.1.44:5000/api/areas');
    return response.data;
};
export const getCate = async () => {
    const response = await axios.get('http://192.168.1.44:5000/api/categorias');
    return response.data;
};