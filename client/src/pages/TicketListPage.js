import React, { useEffect, useState } from 'react';
import { getTickets } from '../api/ticketApi';
import TicketCard from '../components/TicketCard';
import Navbar from '../pages/Navbar';
import "../styles/bootstrap/css/bootstrap.min.css";
import "../styles/TicketListPage.css";

const TicketListPage = () => {
    const [tickets, setTickets] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterArea, setFilterArea] = useState("all");
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
        (filterArea === 'all' || (ticket.area_nombre && ticket.area_nombre.trim().toLowerCase() === filterArea.trim().toLowerCase())) &&
        (filterUser === 'all' || (ticket.created_user && ticket.created_user.trim().toLowerCase() === filterUser.trim().toLowerCase()))
    );

    const groupedTickets = groupTicketsByStatus(filteredTickets);

    const uniqueAreas = [...new Set(tickets.map(ticket => ticket.area_nombre?.trim()).filter(area => area))];
    const uniqueUsers = [...new Set(tickets.map(ticket => ticket.created_user?.trim()).filter(user => user))];

    return (
        <div>
            <Navbar />
            <div className="container mt-4" >
                <h2 className="page-title">Lista de Tickets</h2>

                {/* Filtros en una fila */}
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
                        <label className="page-title">Área:</label>
                        <select className="form-select" onChange={(e) => setFilterArea(e.target.value)} value={filterArea}>
                            <option value="all">Todas</option>
                            {uniqueAreas.map(area => (
                                <option key={area} value={area.toLowerCase()}>{area}</option>
                            ))}
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
        </div>
    );
};

export default TicketListPage;
