import React, { useState, useEffect } from 'react';
import { getCate } from '../api/authApi';

const CateSelect = ({ selectedCate, onChange }) => {
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
    return (
        <div style={{ marginBottom: '10px' }}>
            <label htmlFor="cate-select" style={{ display: 'block', marginBottom: '5px' }}>
                Categoria:
            </label>
            {loading ? (
                <p style={{ color: '#888', fontSize: '14px' }}>Cargando Categoria...</p>
            ) : error ? (
                <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
            ) : (
                <select
                    id="cate-select"
                    value={selectedCate}
                    onChange={(e) => onChange(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                >
                    <option value="">Seleccione un Categoria</option>
                    {categoria.map((categoria1) => (
                        <option key={categoria1.id} value={categoria1.id}>
                            {categoria1.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default CateSelect;
