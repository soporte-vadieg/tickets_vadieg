import React, { useState, useEffect } from 'react';
import { getAreas } from '../api/authApi';

const AreaSelect = ({ selectedArea, onChange }) => {
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

    return (
        <div style={{ marginBottom: '10px' }}>
            <label htmlFor="area-select" style={{ display: 'block', marginBottom: '5px' }}>
                Área destino:
            </label>
            {loading ? (
                <p style={{ color: '#888', fontSize: '14px' }}>Cargando áreas...</p>
            ) : error ? (
                <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
            ) : (
                <select
                    id="area-select"
                    value={selectedArea}
                    onChange={(e) => onChange(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                >
                    <option value="">Seleccione un área</option>
                    {areas.map((area) => (
                        <option key={area.id} value={area.id}>
                            {area.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default AreaSelect;
