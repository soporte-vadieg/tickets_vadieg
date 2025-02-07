import React, { useEffect, useState } from 'react';
import { getCate } from '../api/authApi';
import "../styles/bootstrap/css/bootstrap.min.css"; // Importar estilos de Bootstrap
import logo from '../assets/vadieg_logo_blanco.svg';

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
        <div  className="container mt-5"style={{ padding: '20px', textAlign: 'center' }}>
                    <nav className="navbar">
                                <div className="navbar-logo">
                                <img src={logo} alt="Logo" />
                                </div>
                    </nav>
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
    );
};

export default CateListPage;
