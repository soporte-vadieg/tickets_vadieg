import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TicketListPage from './pages/TicketListPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import CreateTicketPage from './pages/CreateTicketPage';
import AuthProvider from './contexts/AuthContext';
import Register from './pages/RegisterUserPage';
import MainPage from './pages/MainPage';
import UserListPage from './pages/UserListPage';
import AreasListPage from './pages/AreasListPage';
import CateListPage from './pages/CateListPage';
import Home from './pages/HomePage.js';
import Contenido from './pages/ContenidoPage.js';
import CreateContenido from './pages/CreateContenido.js';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/tickets-list" element={<TicketListPage />} />
                    <Route path="/tickets/:id" element={<TicketDetailsPage />} />
                    <Route path="/tickets-create" element={<CreateTicketPage />} />
                    <Route path="/register-page" element={<Register />} />
                    <Route path="/contenido-list" element={<Contenido />} />
                    <Route path="/contenido-create" element={<CreateContenido />} />
                    <Route path="/user-list" element={<UserListPage />} />
                    <Route path="/area-list" element={<AreasListPage />} />
                    <Route path="/categoria-list" element={<CateListPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
