import React, { useEffect, useState } from 'react';
import { getCate } from '../api/authApi';
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

const CateListPage = () => {
    const [categoria, setCate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCate = async () => {
            try {
                const cateData = await getCate();
                setCate(cateData);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los categoria.');
                setLoading(false);
            }
        };

        fetchCate();
    }, []);

    if (loading) return <p className="text-center text-primary mt-4">Cargando categoria...</p>;
    if (error) return <p className="text-center text-danger mt-4">{error}</p>;

    return (
        <div>
     <PageContainer>
                <Navbar />
         <div className="container mt-5">     
            <h1>Lista de categoria</h1>
            <table className="table table-striped table-bordered" border="1" style={{ margin: '20px auto', width: '80%' }}>
                <thead className="table-primary text-center">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {categoria.map((categoria) => (
                        <tr key={categoria.id}className="text-center">
                            <td>{categoria.id}</td>
                            <td>{categoria.name}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>  
         </PageContainer>
        </div>
    );
};

export default CateListPage;
