import React, { useState } from "react";
import "../styles/bootstrap/css/bootstrap.min.css";
import UpdateTicketForm from "../pages/UpdateTicketForm";

const TicketTableBootstrap = ({ ticket }) => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleTicketClick = (id) => {
    setSelectedTicketId(id);
  };

  const closeModal = () => {
    setSelectedTicketId(null);
  };

  const isViewable = (filePath) => {
    const viewableExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "pdf"];
    const fileExtension = filePath.split(".").pop().toLowerCase();
    return viewableExtensions.includes(fileExtension);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Creado</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Urgencia</th>
              <th className="col-fecha">Fecha</th>
              <th>Área</th>
              <th>Categoría</th>
              <th>Asignado</th>             
              <th>Archivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td>{ticket.id}</td>
              <td>{ticket.created_user}</td>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>
                <span className="badge bg-primary">{ticket.status}</span>
              </td>
              <td>
                <span className="badge bg-warning">{ticket.urgency}</span>
              </td>
              <td>{formatDate(ticket.created_at)}</td>
              <td>{ticket.area_nombre}</td>
              <td>{ticket.categoria_nombre}</td>
              <td>{ticket.assigned_user}</td>
             
              <td>
                {ticket.file_path && (
                  <>
                    {isViewable(ticket.file_path) ? (
                      <a
                        href={`http://localhost:5000/${ticket.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-success me-2"
                      >
                        Ver
                      </a>
                    ) : null}
                    <a
                      href={`http://localhost:5000/${ticket.file_path}`}
                      download
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Descargar
                    </a>
                  </>
                )}
              </td>
              <td>
                <button className="btn btn-sm btn-outline-primary" onClick={(e) => {e.stopPropagation();
                handleTicketClick(ticket.id); }}>
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Formulario de actualización si se selecciona un ticket */}
      {selectedTicketId && <UpdateTicketForm ticketId={selectedTicketId} onClose={closeModal} />}
    </div>
  );
};

export default TicketTableBootstrap;
