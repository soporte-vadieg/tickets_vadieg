import React, { useEffect, useState } from 'react';
import { getAreas } from '../api/authApi';
import "../styles/bootstrap/css/bootstrap.min.css"; // Importar estilos de Bootstrap
import logo from '../assets/vadieg_logo_blanco.svg';

const AreasListPage = () => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const areasData = await getAreas();
                setAreas(areasData);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los areas.');
                setLoading(false);
            }
        };

        fetchAreas();
    }, []);

    if (loading) return <p className="text-center text-primary mt-4">Cargando areas...</p>;
    if (error) return <p className="text-center text-danger mt-4">{error}</p>;

    return (
        
        <div className="container mt-5"style={{ padding: '20px', textAlign: 'center' }}>
                            <nav className="navbar">
                                <div className="navbar-logo">
                                <img src={logo} alt="Logo" />
                                </div>
                            </nav>
                            <div className="table-responsive shadow-lg rounded">
            <h1 className="text-center text-primary mb-4" >Lista de Areas</h1>
            <table className="table table-striped table-bordered" border="1" style={{ margin: '20px auto', width: '80%' }}>
                <thead className="table-primary text-center">
                    <tr>
                        <th>ID</th>
                        <th>Nombre de Usuario</th>
                        <th>Lista de mails</th>
                    </tr>
                </thead>
                <tbody>
                    {areas.map((areas) => (
                        <tr key={areas.id} className="text-center">
                            <td>{areas.id}</td>
                            <td>{areas.name}</td>
                            <td>{areas.emails}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        
    );
};

export default AreasListPage;
