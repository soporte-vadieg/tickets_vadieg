import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { login } from '../api/authApi';
import '../styles/LoginPage.css';


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
  
      {/* Contenedor del formulario */}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
        <h2 >Inicio de Sesion</h2>
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
