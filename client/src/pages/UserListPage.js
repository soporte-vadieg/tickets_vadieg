import React, { useEffect, useState } from "react";
import { getUsers } from "../api/authApi";
import "../styles/bootstrap/css/bootstrap.min.css"; // Importar estilos de Bootstrap
import Navbar from '../pages/Navbar';
import styled from 'styled-components';
import backgroundImg from '../assets/imagen_fondo2.jpg'; // Asegúrate de la ruta

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  /* Elimina o comenta background-size si deseas que se repita la imagen en su tamaño original */
  background-size: cover; 
  background-position: center;
  /* Capa oscura superpuesta */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65); /* Ajusta la opacidad aquí */
    z-index: 1; /* Detrás del contenido */
  }

  /* Asegura que el contenido se vea por encima de la cortina */
  > * {
    position: relative;
    z-index: 2;
  }
 
  
`;
const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
                setLoading(false);
            } catch (err) {
                setError("Error al cargar los usuarios.");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading)
        return <p className="text-center text-primary mt-4">Cargando usuarios...</p>;
    if (error)
        return <p className="text-center text-danger mt-4">{error}</p>;

    return (
        <div>
             <PageContainer>
     
                <Navbar />
         <div className="container mt-5">      
            <h1 className="text-center text-primary mb-4">Lista de Usuarios</h1>

            <div className="table-responsive shadow-lg rounded">
                <table className="table table-striped table-bordered">
                    <thead className="table-primary text-center">
                        <tr>
                            <th>ID</th>
                            <th>Nombre de Usuario</th>
                            <th>Rol</th>
                            <th>Área</th>
                            <th>Nombre Completo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="text-center">
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>{user.area_name}</td>
                                <td>{user.full_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
            </PageContainer>
            </div>
            
    );
};

export default UserListPage;
