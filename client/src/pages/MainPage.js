import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import backgroundImg from '../assets/imagen_fondo.jpg'; 
import logo from '../assets/vadieg_logo_blanco.svg'; 

// Contenedor que abarca toda la pantalla con fondo y overlay
const PageContainer = styled.div`
  position: relative;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* Overlay semitransparente */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3); /* Ajusta la opacidad según prefieras */
    z-index: 0;
  }
`;
// Navbar con el logo
const Navbar = styled.nav`
  position: relative;
  z-index: 2;

  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  background: rgba(70, 67, 67, 0.8); /* Fondo semi-transparente */
`;
// Logo
const Logo = styled.img`
  height: 50px; /* Ajusta el tamaño según necesites */
`;
// Contenedor principal para el contenido (se coloca sobre el overlay)
const MainContainer = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  margin-top: 50px;
`;
// Título principal
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #f1f1f1; /* Color claro para resaltar sobre el fondo oscuro */
`;

// Contenedor de botones
const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`;

// Botón reutilizable
const Button = styled.button`
  padding: 12px 25px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  color: #fff;
  background-color: ${(props) => props.bg || '#eba904'};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.hoverBg || '#816013'};
    transform: scale(1.05);
  }
`;
// Botón especial para cerrar sesión
const LogoutButton = styled(Button)`
  background-color: red;
  &:hover {
    background-color: darkred;
  }
`;

const MainPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const userRole = localStorage.getItem("role"); // Obtenemos el rol del usuario

  //console.log(userRole);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageContainer>
      <Navbar>
        <Logo src={logo} alt="Logo" />
      </Navbar>
      <MainContainer>
        <Title>
          Bienvenido, {user?.full_name || 'Usuario'} al Sistema de Gestión de Tickets
        </Title>
        <ButtonContainer>
          <Button onClick={() => navigate('/home')}>Home</Button>
          <Button onClick={() => navigate('/create-tickets')}>Crear Ticket</Button>
          <Button onClick={() => navigate('/tickets')}>Lista Tickets</Button>
          {userRole === "admin" && (
        <>
          <Button onClick={() => navigate('/register-page')}>Crear Usuario</Button>
          <Button onClick={() => navigate('/user-list')}>Usuarios</Button>
          <Button onClick={() => navigate('/area-list')}>Areas</Button>
          <Button onClick={() => navigate('/categoria')}>Categorias</Button>
          </>
           )}
          <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
        </ButtonContainer>
      </MainContainer>
    </PageContainer>
  );
};

export default MainPage;
