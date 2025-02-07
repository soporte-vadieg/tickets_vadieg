import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTickets, updateTicket } from '../api/ticketApi';

const TicketDetailsPage = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [status, setStatus] = useState('');
    const [urgency, setUrgency] = useState('');

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const tickets = await getTickets();
                const selectedTicket = tickets.find(t => t.id === parseInt(id));
                if (selectedTicket) {
                    setTicket(selectedTicket);
                    setStatus(selectedTicket.status);
                    setUrgency(selectedTicket.urgency);
                }
            } catch (error) {
                alert('Error al cargar el ticket');
            }
        };
        fetchTicket();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await updateTicket(id, { status, urgency });
            alert('Ticket actualizado con éxito');
        } catch (error) {
            alert('Error al actualizar el ticket');
        }
    };

    if (!ticket) return <div>Cargando...</div>;

    return (
        <div className="ticket-details-page">
            <h2>Detalles del Ticket</h2>
            <p><strong>Título:</strong> {ticket.title}</p>
            <p><strong>Descripción:</strong> {ticket.description}</p>
            <div>
                <label>Estado:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="abierto">Abierto</option>
                    <option value="en_progreso">En Progreso</option>
                    <option value="cerrado">Cerrado</option>
                </select>
            </div>
            <div>
                <label>Urgencia:</label>
                <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>
            </div>
            <button onClick={handleUpdate}>Actualizar Ticket</button>
        </div>
    );
};

export default TicketDetailsPage;
