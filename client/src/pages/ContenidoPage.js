import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Contenido.css';
import Navbar from '../pages/Navbar';

const Content = () => {
  const [contenidos, setContenidos] = useState([]);
  const [formData, setFormData] = useState({ id: '', titulo: '', descripcion: '', clase: '', fecha: '', archivo: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtener contenidos desde el backend al cargar
  useEffect(() => {
    obtenerContenidos();
  }, []);

  const obtenerContenidos = async () => {
    try {
      const response = await axios.get('http://192.168.1.44:5000/api/contenidos');
      setContenidos(response.data);
    } catch (err) {
      console.error('Error al obtener contenidos:', err);
    }
  };

  // Manejo de campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejo de archivos
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      archivo: e.target.files[0],
    }));
  };

  // EDITAR contenido
  const editarContenido = async (e) => {
    e.preventDefault();
    const { id, titulo, descripcion, clase, fecha, archivo } = formData;

    if (!titulo || !descripcion || !clase || !fecha) {
      alert('Todos los campos son requeridos');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('id', id);
    formDataToSend.append('titulo', titulo);
    formDataToSend.append('descripcion', descripcion);
    formDataToSend.append('clase', clase);
    formDataToSend.append('fecha', fecha);
    if (archivo) formDataToSend.append('archivo', archivo);

    try {
      console.log('ID que se está enviando:', id);    

      const response = await axios.put(`http://192.168.1.44:5000/api/contenidos/${id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setContenidos((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
      cerrarModal();
      obtenerContenidos(); // Para actualizar la lista
    } catch (err) {
      console.error('Error al editar contenido:', err);
    }
  };

  // Eliminar contenido
  const handleDelete = (id) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar este contenido ${id}?`)) {
      axios.delete(`http://192.168.1.44:5000/api/contenidos/${id}`)
        .then(() => obtenerContenidos())
        .catch((err) => console.error('Error al eliminar contenido:', err));
    }
  };

  // Abrir modal para editar
  const handleEdit = (contenido) => {
    console.log('Contenido a editar:', contenido);
    setFormData({
      id: contenido.id,
      titulo: contenido.titulo,
      descripcion: contenido.descripcion,
      clase: contenido.clase,
      fecha: contenido.fecha ? contenido.fecha.split('T')[0] : '', // Cortar la fecha
      archivo: null,
    });
    setIsModalOpen(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setIsModalOpen(false);
    setFormData({ id: '', titulo: '', descripcion: '', clase: '', fecha: '', archivo: null });
  };

  return (
    <div className='contenidoList'>
      <Navbar />
      <div className="container mt-4">
        <h2>Lista de contenidos</h2>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content1">
              <span className="close" onClick={cerrarModal}>&times;</span>
              <h2>Editar Contenido</h2>
              <form onSubmit={editarContenido}>

                <div className="form-group">
                  <label>Título:</label>
                  <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label>Descripción:</label>
                  <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label>Fecha:</label>
                  <input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label>Clase:</label>
                  <select name="clase" value={formData.clase} onChange={handleInputChange} required>
                    <option value="">Seleccione</option>
                    <option value="Novedades">Novedades</option>
                    <option value="Documentación">Documentación</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subir archivo:</label>
                  <input type="file" onChange={handleFileChange} />
                </div>

                <div className="form-buttons">
                  <button type="submit">Guardar Cambios</button>
                  <button type="button" onClick={cerrarModal}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ul>
          {contenidos.length > 0 ? contenidos.map((item) => (
            <li key={item.id}>
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
              <p>{item.clase}</p>
              <p>{item.fecha}</p>
              {item.archivo && (
                <a href={`http://192.168.1.44:5000/uploads/${item.archivo}`} target="_blank" rel="noopener noreferrer">Ver archivo</a>
              )}
              <div>
                <button onClick={() => handleEdit(item)}>Editar</button>
                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
              </div>
              <hr />
            </li>
          )) : <p>No hay contenidos disponibles.</p>}
        </ul>
      </div>
    </div>
  );
};

export default Content;
