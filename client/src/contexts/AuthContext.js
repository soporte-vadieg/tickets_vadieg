import React, { createContext, useState, useEffect } from 'react';

// Crear contexto de autenticación
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado inicial del usuario como null

    // Recuperar usuario de localStorage al cargar el componente
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
             

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser({
                id: parsedUser.userId,
                username: parsedUser.username,
                email: parsedUser.email,
                token: parsedUser.token, // Si es necesario
               full_name: parsedUser.full_name,
                
            });
            
        }    
    }, []);


    // Función para iniciar sesión
    const login = (userData) => {
        if (!userData || !userData.userId || !userData.username || !userData.email|| ! userData.full_name) {
            console.error('Datos de usuario inválidos');
            return;
        }
        setUser({
            id: userData.userId,
            username: userData.username,
            email: userData.email,
            token: userData.token, // Si es necesario
            full_name : userData.full_name,
           
        });

        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        if (userData.token) {
            localStorage.setItem('authToken', userData.token);
        }
        //console.log('Usuario autenticado:', userData);
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null); // Limpiar el estado del usuario
        localStorage.removeItem('user'); // Eliminar usuario de localStorage
        localStorage.removeItem('authToken'); // Eliminar token de localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
