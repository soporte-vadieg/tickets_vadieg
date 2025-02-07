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


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/tickets" element={<TicketListPage />} />
                    <Route path="/tickets/:id" element={<TicketDetailsPage />} />
                    <Route path="/create-tickets" element={<CreateTicketPage />} />
                    <Route path="/register-page" element={<Register />} />
                    <Route path="/user-list" element={<UserListPage />} />
                    <Route path="/area-list" element={<AreasListPage />} />
                    <Route path="/categoria" element={<CateListPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
