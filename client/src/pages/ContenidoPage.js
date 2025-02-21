import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Contenido.css';
import Navbar from '../pages/Navbar';

const Content = () => {
  const [contenidos, setContenidos] = useState([]);
  const [editContent, setEditContent] = useState(null);
  const [formData, setFormData] = useState({ id: '', titulo: '', descripcion: '', clase: '', fecha: '', archivo: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/contenidos')
      .then((response) => {
        setContenidos(response.data);
      })
      .catch((err) => {
        console.error('Error al obtener contenidos:', err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { id, titulo, descripcion, clase, fecha, archivo } = formData;

  

    if (!titulo || !descripcion || !clase || !fecha) {
      alert('Todos los campos son requeridos');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('titulo', titulo);
    formDataToSend.append('descripcion', descripcion);
    formDataToSend.append('clase', clase);
    formDataToSend.append('fecha', fecha);

    if (archivo) {
      formDataToSend.append('archivo', archivo);
    }

    try {
      const url = editContent
        ? `http://localhost:5000/api/contenidos/${editContent.id}`
        : 'http://localhost:5000/api/contenidos';
      const method = editContent ? 'PUT' : 'POST';

      const response = await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (editContent) {
        setContenidos((prev) =>
          prev.map((item) => (item.id === editContent.id ? response.data : item))
        );
      } else {
        setContenidos((prev) => [...prev, response.data]);
      }

      setIsModalOpen(false);
      setFormData({ id: '', titulo: '', descripcion: '', clase: '', fecha: '', archivo: null });
    } catch (err) {
      console.error('Error al agregar o editar contenido:', err.response?.data || err.message);
    }
  };

// Función para eliminar un contenido
const handleDelete = (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este contenido?')) {
    axios.delete(`http://localhost:5000/api/contenidos/${id}`)
      .then(() => {
        setContenidos((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error('Error al eliminar contenido:', err.response?.data || err.message);
      });
  }
};

  const handleEdit = (id) => {
    const content = contenidos.find((item) => item.id === id);
    setEditContent(content);
    setFormData({
      id: content.id,
      titulo: content.titulo,
      descripcion: content.descripcion,
      clase: content.clase,
      fecha: content.fecha,
      archivo: null,
    });

    setIsModalOpen(true);
  };

  return (
    <div className='contenido'>
      <Navbar />
      <div className="container mt-4">
        <h2>Lista de contenidos</h2>
        <button
          className="add-button"
          onClick={() => {
            setEditContent(null);
            setFormData({ id: '', titulo: '', descripcion: '', clase: '', fecha: '', archivo: null });
            setIsModalOpen(true);
          }}
        >
          Agregar Contenido
        </button>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
              <h2>{editContent ? 'Editar Contenido' : 'Agregar Contenido'}</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="titulo">Título:</label>
                  <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="descripcion">Descripción:</label>
                  <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="fecha">Fecha:</label>
                  <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleInputChange} required />
                </div>
                <div className="select-container">
                  <label htmlFor="clase">Clase:</label>
                  <select id="clase" name="clase" value={formData.clase} onChange={handleInputChange} required>
                    <option value="Novedades">Novedades</option>
                    <option value="Documentación">Documentación</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="archivo">Subir archivo:</label>
                  <input type="file" id="archivo" name="archivo" onChange={(e) => setFormData({ ...formData, archivo: e.target.files[0] })} />
                  {editContent && editContent.archivo && (
                    <div>
                      <p>Archivo actual:</p>
                      <a href={`http://localhost:5000/uploads/${editContent.archivo}`} target="_blank" rel="noopener noreferrer">
                        {editContent.archivo}
                      </a>
                    </div>
                  )}
                </div>
                <div className="form-buttons">
                  <button type="submit">{editContent ? 'Guardar Cambios' : 'Agregar Contenido'}</button>
                  <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ul>
          {contenidos.length > 0 ? (
            contenidos.map((item) => (
              <li key={item.id}>
                <h3>{item.titulo}</h3>
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Descripción:</strong> {item.descripcion}</p>
                <p><strong>Clase:</strong> {item.clase}</p>
                <p><strong>Fecha:</strong> {item.fecha}</p>
                {item.archivo && (
                  <a href={`http://localhost:5000/uploads/${item.archivo}`} target="_blank" rel="noopener noreferrer">Ver archivo</a>
                )}
                <hr />
                <div>
                  <button onClick={() => handleEdit(item.id)}>Editar</button>
                  <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                </div>
              </li>
            ))
          ) : (
            <p>No hay contenidos disponibles.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Content;
