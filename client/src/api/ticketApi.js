import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tickets';



const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token de autenticación no disponible');
    }
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
};
export const getTickets = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los tickets:', error);
        if (error.response) {
            console.error('Detalles del error:', error.response.data);
        }
        throw error;
    }
};


export const createTicket = async (ticketData) => {
    try {
        // Verificamos que se haya pasado ticketData como un objeto
        if (!ticketData || typeof ticketData !== 'object') {
            throw new Error('Los datos del ticket son inválidos');
        }
 
        const response = await axios.post('http://localhost:5000/api/tickets/create-tickets', ticketData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Asegúrate de usar este encabezado para archivos
         
            },
        });

        // Verificamos si la respuesta tiene los datos esperados
        if (response && response.data) {
            return response.data;  // Devuelve la data de la respuesta del backend
        } else {
            throw new Error('Respuesta inválida del servidor');
        }
    } catch (error) {
        console.error('Error al crear el ticket:', error); // Imprime detalles del error para depuración
        throw error;  // Re-lanzamos el error para que pueda ser manejado por el llamador
    }
};
export const updateTicket = async (ticketId, updates) => {
    try {
        const response = await axios.put(`${API_URL}/${ticketId}`, updates, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el ticket:', error);
        throw error.response?.data || 'Error al actualizar el ticket';
    }
};
export const getAreas = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/areas', { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las areas:', error);
        if (error.response) {
            console.error('Detalles del error:', error.response.data);
        }
        throw error;
    }
};
export const getCate = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/categorias', { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
        if (error.response) {
            console.error('Detalles del error:', error.response.data);
        }
        throw error;
    }
};