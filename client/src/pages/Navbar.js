import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/vadieg_logo_blanco.svg'; // Asegúrate de que la ruta del logo es correcta

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
  const handleLogout = () => {
    // Eliminar el token de autenticación o cualquier información de sesión
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    navigate('/login'); // Redirigir a la página de login (o donde sea apropiado)
  };

  return (
    <NavbarContainer>
    <Logo src={logo} alt="Logo" onClick={() => navigate("/")} />
    <NavLinks>
      {/* Enlaces para TODOS los usuarios */}
      <NavLink onClick={() => navigate("/create-tickets")}>Crear Ticket</NavLink>
      <NavLink onClick={() => navigate("/tickets")}>Lista de Tickets</NavLink>

      {/* Enlaces SOLO para ADMIN */}
      {userRole === "admin" && (
        <>
          <NavLink onClick={() => navigate("/user-list")}>Usuarios</NavLink>
          <NavLink onClick={() => navigate("/area-list")}>Áreas</NavLink>
          <NavLink onClick={() => navigate("/categoria")}>Categorías</NavLink>
        </>
      )}

      {/* Botón de Cerrar Sesión */}
      <NavLink onClick={handleLogout}>Cerrar sesión</NavLink>
    </NavLinks>
  </NavbarContainer>
  );
};

export default Navbar;
