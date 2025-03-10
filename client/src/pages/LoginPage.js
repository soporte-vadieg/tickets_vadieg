import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../api/authApi";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { login: loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const userData = await login(credentials);

      localStorage.setItem("authToken", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.full_name) {
        localStorage.setItem("fullname", userData.full_name);
        localStorage.setItem("role", userData.role);
      } else {
        console.log("No se recibió full_name en la respuesta.");
      }

      loginUser(userData);
      console.log("Nombre Completo:", localStorage.getItem("fullname"));
      console.log("Rol actual del usuario:", localStorage.getItem("role"));

      // Mostrar mensaje de éxito
      setSuccessMessage(true);

      // Activar animación de salida y redirigir después de un momento
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => navigate("/home"), 800);
      }, 1500); // Mostrar el mensaje por 1.5 segundos antes de la animación de salida
    } catch (error) {
      alert("Fallo en el inicio, revise las credenciales");
      setIsLoggingIn(false);
    }
  };

  return (
    <motion.div
      className="login-page"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="login-container"
        animate={fadeOut ? { opacity: 0, scale: 0.8 } : {}}
        transition={{ duration: 0.8 }}
      >
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Inicio de Sesión</h2>
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            disabled={isLoggingIn}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            disabled={isLoggingIn}
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Cargando..." : "Ingresar"}
          </motion.button>
        </form>
      </motion.div>

      {/* Mensaje de éxito con animación */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            ✅ Inicio exitoso. Redirigiendo...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoginPage;
