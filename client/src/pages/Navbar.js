import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/vadieg_logo_blanco.svg'; // Asegúrate de que la ruta del logo es correcta
import { Link, useLocation } from 'react-router-dom'; // Importamos useLocation

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  background: rgba(107, 102, 102, 0.7);
  color: white;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 10;
`;
const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;
const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;
const NavLink = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  const location = useLocation(); // Obtenemos la ruta actual
  const handleLogout = () => {
    // Eliminar el token de autenticación o cualquier información de sesión
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    navigate('/'); 
  };

  return (
    <NavbarContainer>
    <Logo src={logo} alt="Logo" onClick={() => navigate("/main")} />
    <NavLinks>
    {/* Solo mostrar este enlace si NO estamos en /ticket-create */}
      {location.pathname !== "/tickets-create" && (
        <li><Link to="/tickets-create">Crear Ticket</Link></li>
      )}

      {location.pathname !== "/tickets-list" && (
        <li><Link to="/tickets-list">Lista de Tickets</Link></li>
      )}


      {/* Enlaces SOLO para ADMIN */}
      {userRole === "admin" && (
        <>
           {location.pathname !== "/user-list" && (
        <li><Link to="/user-list">Usuarios</Link></li>
        )}
            {location.pathname !== "/area-list" && (
          <li><Link to="/area-list">Áreas</Link></li>
          )}          
                {location.pathname !== "/categoria-list" && (
                <li><Link to="/categoria-list">Categorías</Link></li>
                )}     
        </>
      )}

      {/* Botón de Cerrar Sesión */}
      <NavLink onClick={handleLogout}>Cerrar sesión</NavLink>
    </NavLinks>
  </NavbarContainer>
  );
};

export default Navbar;
