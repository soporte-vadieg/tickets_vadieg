import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/vadieg_logo_blanco.svg'; // Asegúrate de que la ruta del logo es correcta
import { useLocation } from 'react-router-dom'; // Importamos useLocation

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

const NavLink = styled.a`
  background: none;
  border: none;
  color: white; /* Mantén el color blanco siempre */
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;

  /* Eliminar cualquier cambio de color al hacer hover */
  &:hover {
    color: white;
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

  // Función que maneja la navegación de los enlaces sin recargar la página
  const handleNavigation = (event, path) => {
    event.preventDefault(); // Evita la recarga de la página
    navigate(path); // Realiza la navegación con React Router
  };

  return (
    <NavbarContainer>
      <Logo src={logo} alt="Logo" onClick={() => navigate("/main")} />
      <NavLinks>
        {/* Solo mostrar este enlace si NO estamos en /home */}
        {location.pathname !== "/home" && (
          <NavLink href="/home" onClick={(e) => handleNavigation(e, '/home')}>Portal</NavLink>
        )}
        {location.pathname !== "/tickets-create" && (
          <NavLink href="/tickets-create" onClick={(e) => handleNavigation(e, '/tickets-create')}>Crear Ticket</NavLink>
        )}
        {location.pathname !== "/tickets-list" && (
          <NavLink href="/tickets-list" onClick={(e) => handleNavigation(e, '/tickets-list')}>Lista de Tickets</NavLink>
        )}

        {/* Enlaces SOLO para ADMIN */}
        {userRole === "admin" && (
          <>

            {location.pathname !== "/contenido-list" && (
              <NavLink href="/contenido-list" onClick={(e) => handleNavigation(e, '/contenido-list')}>Lista Contenido</NavLink>
            )}

            {location.pathname !== "/user-list" && (
              <NavLink href="/user-list" onClick={(e) => handleNavigation(e, '/user-list')}>Usuarios</NavLink>
            )}

            {location.pathname !== "/area-list" && (
              <NavLink href="/area-list" onClick={(e) => handleNavigation(e, '/area-list')}>Áreas</NavLink>
            )}
            {location.pathname !== "/categoria-list" && (
              <NavLink href="/categoria-list" onClick={(e) => handleNavigation(e, '/categoria-list')}>Categorías</NavLink>
            )}
          </>
        )}

        {/* Botón de Cerrar Sesión */}
        <NavLink href="#" onClick={(e) => handleLogout()}>Cerrar sesión</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
