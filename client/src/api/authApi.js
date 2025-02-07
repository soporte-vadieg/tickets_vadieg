import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/users';

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
    const response = await axios.get('http://localhost:5000/api/users/users');
    return response.data;
};
export const getAreas = async () => {
    const response = await axios.get('http://localhost:5000/api/areas/areas');
    return response.data;
};
export const getCate = async () => {
    const response = await axios.get('http://localhost:5000/api/categorias/categorias');
    return response.data;
};