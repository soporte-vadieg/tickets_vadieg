import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Contenido.css';
import Navbar from '../pages/Navbar';

const Content = () => {
  const [contenidos, setContenidos] = useState([]);
  const [editContent, setEditContent] = useState(null);
  const [formData, setFormData] = useState({ id: '', titulo: '', descripcion: '', clase: '', fecha: '', archivo: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtener contenidos desde el backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/contenidos')
      .then((response) => setContenidos(response.data))
      .catch((err) => console.error('Error al obtener contenidos:', err));
  }, []);  // Agregamos dependencia

  useEffect(() => {
    if (isModalOpen) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
      setFormData((prevData) => ({
        ...prevData,
        fecha: formattedDate, // Establecer la fecha actual en el formulario
      }));
    }
  }, [isModalOpen]); // Se ejecuta cuando se abre el modal

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario (Agregar o Editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { titulo, descripcion, clase, fecha } = formData;
    
    console.log("Datos enviados:", { titulo, descripcion, clase, fecha });
  
    if (!titulo || !descripcion || !clase || !fecha) {
      alert('Todos los campos son requeridos');
      return;
    }
  
    // Configuración del FormData
    const formDataToSend = new FormData();
    formDataToSend.append('titulo', titulo);
    formDataToSend.append('descripcion', descripcion);
    formDataToSend.append('clase', clase);
    formDataToSend.append('fecha', fecha);
  
    // Solo agregamos el archivo si se ha seleccionado uno nuevo
    if (formData.archivo) {
      formDataToSend.append('archivo', formData.archivo);
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
          'Content-Type': 'multipart/form-data', // Asegúrate de usar 'multipart/form-data'
        },
      });
  
      // Actualizamos los contenidos
      if (editContent) {
        setContenidos((prev) =>
          prev.map((item) => (item.id === editContent.id ? response.data : item))
        );
      } else {
        setContenidos((prev) => [...prev, response.data]);
      }     
    
      setFormData({ titulo: '', descripcion: '', clase: '', archivo: null ,fecha: '' });
      setIsModalOpen(false);
      setEditContent(null);
      
    } catch (err) {
      console.error('Error al agregar o editar contenido:', err.response?.data || err.message);
    }
  };  

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      archivo: e.target.files[0],
    }));
  };

  // Función para eliminar un contenido
  const handleDelete = (id) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar este contenido ${id}?`)) {
      axios.delete(`http://localhost:5000/api/contenidos/${id}`)
        .then(() => {
          window.location.reload(); // Recarga la página después de eliminar
        })
        .catch((err) => {
          console.error('Error al eliminar contenido:', err);
        });
    }
  };

  // Función para manejar la edición
  const handleEdit = (id) => {
    const content = contenidos.find((item) => item.id === id);
  
    // Establecer los datos del contenido en el formulario, incluyendo la fecha
    setEditContent(content);
    setFormData({
      titulo: content.titulo,
      descripcion: content.descripcion,
      clase: content.clase,
      archivo: null, // Aseguramos que 'archivo' se resetee al editar
      fecha: content.fecha || '', // Establecer la fecha del contenido original
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
          setFormData({ id: '' ,titulo: '', descripcion: '', clase: '', fecha: '' });
          setIsModalOpen(true);
        }}
      >
        Agregar Contenido
      </button>

      {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
              <h2>{editContent ? 'Editar Contenido' : 'Agregar Contenido'}</h2>
              <form onSubmit={handleSubmit}>
                
                <div className="form-group">
                  <label htmlFor="titulo">Título:</label>
                  <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción:</label>
                  <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="fecha">Fecha:</label>
                  <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="clase">Clase:</label>
                  <select id="clase" name="clase" value={formData.clase} onChange={handleInputChange} required>
                    <option value="Novedades">Novedades</option>
                    <option value="Documentación">Documentación</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="archivo">Subir archivo:</label>
                  <input type="file" id="archivo" name="archivo" onChange={handleFileChange} />
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
              <p>{item.descripcion}</p>
              <p>{item.clase}</p>
              <p>{item.fecha}</p>
              <h6>ID : {item.id}</h6>
              {item.archivo && (
                <a href={`http://localhost:5000/uploads/${item.archivo}`} target="_blank" rel="noopener noreferrer">
                Ver archivo
                </a>
                
            )}
            <hr/>
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
