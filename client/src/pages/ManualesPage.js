import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../pages/Navbar';

import '../styles/Manuales.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

const Manual = () => {
  const [manuales, setManuales] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [showModal, setShowModal] = useState(false); // Control del modal
  const userData = JSON.parse(localStorage.getItem('user'));
  const [file, setFile] = useState(null);
  

  // Obtener manuales al cargar
  useEffect(() => {
    obtenerManuales();
  }, []);

  const obtenerManuales = async () => {
    try {
      const response = await axios.get('http://192.168.1.44:5000/api/manuales');
      setManuales(response.data);
    } catch (err) {
      console.error('Error al obtener contenidos:', err);
    }
  };

  // Crear manual
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('usuario_subio', userData.full_name);
    formData.append('fecha_subida', new Date().toISOString().split('T')[0]); 
    if (file) {
      formData.append('url_documento', file); 
    }
    
    try {
      const response = await axios.post('http://192.168.1.44:5000/api/create-manuales', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Manual creado:', response.data);
  
      Swal.fire({
        icon: 'success',
        title: 'Manual creado correctamente',
        text: `ID del manual: ${response.data.id}`,
        confirmButtonText: 'Aceptar'
      });
  
      // Limpiar formulario
      setTitulo('');
      setDescripcion('');
      setFile(null);
  
      // Cerrar modal
      setShowModal(false);
  
      // Actualizar lista
      obtenerManuales();
  
    } catch (err) {
      console.error('Error al crear manual:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear manual',
        text: 'Revisa la consola para más detalles.'
      });
    }
  };
  

  return (
    <div className='manualList'>
      <Navbar />
      <div className="container mt-4">

        {/* Botón para abrir modal */}
        <button className="btn btn-primary mb-4" onClick={() => setShowModal(true)}>
          Crear Nuevo Manual
        </button>

        <h2>Lista de Manuales y Procedimientos</h2>

        {/* LISTA DE MANUALES */}
        <div className="container mt-4">
            {manuales.length > 0 ? (
              <div className="row">
                {manuales.map((item) => (
                  <div key={item.id} className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-primary">{item.titulo}</h5>
                        <p className="card-text flex-grow-1">{item.descripcion}</p>
                        <p className="card-text">
                          <small className="text-muted">Subido por: {item.usuario_subio}</small><br />
                          <small className="text-muted">Fecha: {item.fecha_subida}</small>
                        </p>
                      </div>
                      <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between">
                      <a 
                          href={`http://192.168.1.44:5000/${item.url_documento}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Ver Documento
                        </a>

                        <a 
                          href={`http://192.168.1.44:5000/api/manuales/${item.id}/download`} 
                          className="btn btn-outline-success btn-sm"
                        >
                          Descargar
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No hay contenidos disponibles.</p>
            )}
          </div>

     </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Nuevo Manual</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Título:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descripción:</label>
                    <textarea
                      className="form-control"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">URL del Documento:</label>
                    <input
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                          accept=".jpg,.png,.pdf"
                    />
                  </div>


                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                    <button type="submit" className="btn btn-success">Crear Manual</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manual;
