import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { login } from '../api/authApi';
import '../styles/LoginPage.css';
import logo from '../assets/vadieg_logo_blanco.svg'; // Asegúrate de tener esta imagen en la ruta indicada

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login: loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(credentials);

      // Guarda el token y otros datos en localStorage
      localStorage.setItem('authToken', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));


      if (userData.full_name) {
        localStorage.setItem('fullname', userData.full_name);
        localStorage.setItem('role', userData.role);
      } else {
        console.log('No se recibió full_name en la respuesta.');
      }

      // Actualiza el estado del usuario en AuthContext
      loginUser(userData);
      console.log("Nombre Completo:",localStorage.getItem('fullname'));
      console.log("Rol actual del usuario:",localStorage.getItem('role'));

      alert('Inicio Exitoso');
      navigate('/main');
    } catch (error) {
      alert('Fallo en el inicio, revise las credenciales');
    }
  };

  return (
    <div className="login-page">
      {/* Navbar con logo */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
      </nav>

      {/* Contenedor del formulario */}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
