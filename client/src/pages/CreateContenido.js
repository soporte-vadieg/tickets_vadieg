import React, { useState } from 'react';
import { createContenido } from '../api/ContenidoApi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

const CreateContenido = () => {
  const [contenido, setContenido] = useState({
    titulo: '',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0], // Fecha de hoy por defecto
    clase: 'Novedades'
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Estado para mostrar errores
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (contenido.titulo.trim().length < 5) {
      setError('El título debe tener al menos 5 caracteres.');
      return;
    }

    if (contenido.descripcion.trim().length < 10) {
      setError('La descripción debe tener al menos 10 caracteres.');
      return;
    }

    if (!contenido.fecha) {
      setError('Debe seleccionar una fecha.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('titulo', contenido.titulo);
      formData.append('descripcion', contenido.descripcion);
      formData.append('clase', contenido.clase);
      formData.append('fecha', contenido.fecha);
      console.log([...formData]); 
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
          setError('Formato de archivo no permitido. Solo JPG, PNG o PDF.');
          setLoading(false);
          return;
        }
        formData.append('archivo', file);
      }

      const response = await createContenido(formData);
      alert(`Contenido creado con éxito: ${response.ContenidoId}`);

      // Reinicia el formulario
      setContenido({ titulo: '', descripcion: '', fecha: '', clase: 'Novedades' });
      setFile(null);
      navigate('/home');
    } catch (error) {
      console.error('Error al crear el contenido:', error);
      setError('Hubo un problema al crear el contenido. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            value={contenido.titulo}
            onChange={(e) => setContenido({ ...contenido, titulo: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            placeholder="Descripción"
            value={contenido.descripcion}
            onChange={(e) => setContenido({ ...contenido, descripcion: e.target.value })}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Clase</label>
          <select
            className="form-control"
            value={contenido.clase}
            onChange={(e) => setContenido({ ...contenido, clase: e.target.value })}
            required
          >
            <option value="Novedades">Novedades</option>
            <option value="Documentacion">Documentación</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={contenido.fecha}
            onChange={(e) => setContenido({ ...contenido, fecha: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Adjuntar Archivo</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".jpg,.png,.pdf"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear contenido"}
        </button>
      </form>
    </div>
  );
};

export default CreateContenido;
