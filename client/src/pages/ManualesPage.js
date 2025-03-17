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
  const [urlDocumento, setUrlDocumento] = useState('');
  const [showModal, setShowModal] = useState(false); // Control del modal
  const userId = (localStorage.getItem('user')); // Lo convierte a número


  // Obtener manuales al cargar
  useEffect(() => {
    obtenerManuales();
  }, []);

  const obtenerManuales = async () => {
    try {
      const response = await axios.get('http://192.168.1.215:5000/api/manuales');
      setManuales(response.data);
     console.log(userId);
    } catch (err) {
      console.error('Error al obtener contenidos:', err);
    }
  };

  // Crear manual
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoManual = {
      titulo,
      descripcion,
      url_documento: urlDocumento,
      usuario_subio:localStorage.getItem('userId'),  // Si tienes el ID en el almacenamiento local
      fecha_subida: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };

    try {
      const response = await axios.post('http://192.168.1.215:5000/api/create-manuales', nuevoManual);
      console.log('Manual creado:', response.data);

      // SweetAlert con ID del manual creado
      Swal.fire({
        icon: 'success',
        title: 'Manual creado correctamente',
        text: `ID del manual: ${response.data.id}`,
        confirmButtonText: 'Aceptar'
      });

      // Limpiar formulario
      setTitulo('');
      setDescripcion('');
      setUrlDocumento('');

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
            <ul>
              {manuales.map((item) => (
                <li key={item.id}>
                  <h3><strong>Título:</strong> {item.titulo}</h3>
                  <p><strong>Descripción:</strong> {item.descripcion}</p>
                  <p><strong>URL:</strong> <a href={item.url_documento} target="_blank" rel="noopener noreferrer">{item.url_documento}</a></p>
                  <p><strong>Fecha:</strong> {item.fecha_subida}</p>
                  <p><strong>Usuario:</strong> {item.usuario_subio}</p>
                  <hr />
                </li>
              ))}
            </ul>
          ) : <p>No hay contenidos disponibles.</p>}
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
                      type="url"
                      className="form-control"
                      value={urlDocumento}
                      onChange={(e) => setUrlDocumento(e.target.value)}
                      required
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
