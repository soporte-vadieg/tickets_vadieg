import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketHistory = ({ ticketId }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get(`http://192.168.1.215:5000/api/tickets/${ticketId}/history`)
            .then(response => setHistory(response.data))
            .catch(error => console.error("Error al obtener historial:", error));
    }, [ticketId]);

    return (
        <div>
            <h3>Historial de Cambios</h3>
            <table>
                <thead>
                    <tr>
                        <th>Estado Anterior</th>
                        <th>Estado Nuevo</th>
                        <th>Fecha de Cambio</th>
                        <th>Observación</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((record, index) => (
                        <tr key={index}>
                            <td>{record.status_anterior}</td>
                            <td>{record.status_nuevo}</td>
                            <td>{new Date(record.fecha_cambio).toLocaleString()}</td>
                            <td>{record.observacion || "Sin observación"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketHistory;
