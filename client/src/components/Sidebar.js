import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><Link to="/tickets">Tickets</Link></li>
                    <li><Link to="/tickets/create">Crear Ticket</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
