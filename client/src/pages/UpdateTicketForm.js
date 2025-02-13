import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/bootstrap/css/bootstrap.min.css"; // Asegúrate de que este CSS esté importado
import "../styles/UpdateTicketForm.css"; // Asegúrate de que este CSS esté importado para mantener la coherencia

const UpdateTicketForm = ({ ticket, onClose }) => {
    const [status, setStatus] = useState('');   
    const [assignedTo, setAssignedTo] = useState('');
    const [observacion, setObservacion] = useState('');
    const [users, setUsers] = useState([]);    

    // Obtener los usuarios disponibles para asignar al ticket
    useEffect(() => {
        axios.get('http://localhost:5000/api/users') // Asumimos que tienes una ruta para obtener los usuarios
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los usuarios:', error);
            });
    }, []);

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (status === "cerrado" && !observacion.trim()) {
            alert("Debe ingresar una observación para cerrar el ticket.");
            return;
        }
        const updatedTicket = {
            status: status || null,
            assigned_to: assignedTo || null,
            observacion: observacion || null // Agregar observación
        };
      

        // Obtener el token de autenticación (suponiendo que está almacenado en localStorage o estado)
        const token = localStorage.getItem('authToken'); // O usa el estado si lo tienes

        axios.put(`http://localhost:5000/api/${ ticket.id}`, updatedTicket, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            alert('Ticket actualizado con éxito');
            window.location.reload(); // Recargar la página
        })
        .catch(error => {
            console.error('Error al actualizar el ticket:', error);
            alert('Error al actualizar el ticket');
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h2 className="page-title">Actualizar Ticket</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Estado :</label>
                        <select 
                            className="form-select" 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)} 
                        >
                            <option value="">Seleccionar...</option>
                            <option value="abierto">Abierto</option>
                            <option value="en_progreso">En progreso</option>
                            <option value="cerrado">Cerrado</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Asignar a :</label>
                        <select 
                            className="form-select" 
                            value={assignedTo} 
                            onChange={(e) => setAssignedTo(e.target.value)}
                        >
                            <option value="">No asignar</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    {status === "cerrado" && (
                        <div>
                            <label className="form-label">Observación:</label>
                            <textarea className="form-control"
                                value={observacion}
                                onChange={(e) => setObservacion(e.target.value)}
                                placeholder="Detalle el motivo del cierre..."
                                required
                            />
                        </div>
                        
                    )}
                   <hr></hr> <button type="submit" className="btn btn-primary">Actualizar Ticket</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTicketForm;
