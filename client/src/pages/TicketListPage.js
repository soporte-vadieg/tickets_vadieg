import React, { useEffect, useState } from 'react';
import { getTickets } from '../api/ticketApi';
import TicketCard from '../components/TicketCard';
import Navbar from '../pages/Navbar';
import "../styles/TicketListPage.css";
import styled from 'styled-components';
import backgroundImg from '../assets/imagen_fondo2.jpg'; // Asegúrate de la ruta
const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  /* Elimina o comenta background-size si deseas que se repita la imagen en su tamaño original */
  background-size: cover; 
  background-position: center;  
  /* Capa oscura superpuesta */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65); /* Ajusta la opacidad aquí */
    z-index: 1; /* Detrás del contenido */
  }

  /* Asegura que el contenido se vea por encima de la cortina */
  > * {
    position: relative;
    z-index: 2;
  }

  
  
`;
const TicketListPage = () => {
    const [tickets, setTickets] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");

    const [filterUser, setFilterUser] = useState("all");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await getTickets();
                setTickets(data);
            } catch (error) {
                alert('Error al cargar los tickets');
            }
        };
        fetchTickets();
    }, []);

    const groupTicketsByStatus = (tickets) => {
        return tickets.reduce((groups, ticket) => {
            const status = ticket.status;
            if (!groups[status]) {
                groups[status] = [];
            }
            groups[status].push(ticket);
            return groups;
        }, {});
    };

    const filteredTickets = tickets.filter(ticket => 
        (filterStatus === 'all' || ticket.status === filterStatus) &&
        (filterUser === 'all' || (ticket.created_user && ticket.created_user.trim().toLowerCase() === filterUser.trim().toLowerCase()))
    );

    const groupedTickets = groupTicketsByStatus(filteredTickets);

    const uniqueUsers = [...new Set(tickets.map(ticket => ticket.created_user?.trim()).filter(user => user))];

    return (
        <div >
        <PageContainer>
            <Navbar />
            <div className="container mt-4" >
                <h2>Lista de Tickets</h2>

                {/* Filtros en una fila sdasdasasd */}
                <div className="d-flex flex-wrap gap-3 align-items-center mb-3 justify-content-around" >
                    <div>
                        <label className="page-title">Estado:</label>
                        <select className="form-select" onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
                            <option value="all">Todos</option>
                            <option value="abierto">Sin atender</option>
                            <option value="en_progreso">En Progreso</option>
                            <option value="cerrado">Cerrados</option>
                        </select>
                    </div>
                    
        
                    <div>
                        <label className="page-title">Usuario:</label>
                        <select className="form-select" onChange={(e) => setFilterUser(e.target.value)} value={filterUser}>
                            <option value="all">Todos</option>
                            {uniqueUsers.map(user => (
                                <option key={user} value={user.toLowerCase()}>{user}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    {Object.keys(groupedTickets).map(status => (
                        <div key={status} className="mb-4">
                            <h3 className="page-title">
                                {status === 'abierto' ? 'Sin atender' : 
                                 status === 'en_progreso' ? 'En Progreso' : 'Cerrados'} ({groupedTickets[status].length})
                            </h3>                      
                            <div>
                                {groupedTickets[status].map(ticket => (
                                    <TicketCard key={ticket.id} ticket={ticket} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </PageContainer>
        </div>
    );
};

export default TicketListPage;
