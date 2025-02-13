import React, { useState, useContext } from 'react';
import { createTicket } from '../api/ticketApi';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../assets/imagen_fondo2.jpg'; // Asegúrate de la ruta
import AreaSelect from '../components/AreaSelect';
import CateSelect from '../components/CateSelect';
import Navbar from '../pages/Navbar';

/* ============================= */
/*       Styled Components       */
/* ============================= */

// Contenedor principal con fondo y overlay
const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  /* Elimina o comenta background-size si deseas que se repita la imagen en su tamaño original */
  background-size: cover; 
  background-position: center;

  /* Overlay semitransparente */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 0;
  }
`;
// Contenedor del formulario (contenido principal)
const FormContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin:auto;
  margin-top:10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;
// Título del formulario
const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  color: #2c3e50;
`;
// Mensaje de error
const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 1rem;
`;
// Estilos para los inputs
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;
// Estilos para el textarea
const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;
// Estilos para el select
const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;
// Botón principal
const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
  
/* ============================= */
/*       Componente Main         */
/* ============================= */

const CreateTicketPage = () => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    urgency: 'baja',
    area: '',
    categoria: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      alert('Usuario no autenticado. Inicia sesión para crear un ticket.');
      return;
    }

    if (ticket.title.trim().length < 5) {
      setError('El título debe tener al menos 5 caracteres.');
      return;
    }

    if (ticket.description.trim().length < 10) {
      setError('La descripción debe tener al menos 10 caracteres.');
      return;
    }

    if (!ticket.area) {
      setError('Debe seleccionar un área.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', ticket.title);
      formData.append('description', ticket.description);
      formData.append('urgency', ticket.urgency);
      formData.append('id_area', ticket.area);
      formData.append('id_categoria', ticket.categoria);
      formData.append('created_by', user.id);

      if (file) {
        formData.append('file', file);
      }

      const response = await createTicket(formData);
      alert(`Ticket creado con éxito: ${response.ticketId}`);

      // Reinicia el formulario
      setTicket({ title: '', description: '', urgency: 'baja', area: '', categoria: '' });
      setFile(null);
      navigate('/tickets-list');
    } catch (error) {
      console.error('Error al crear el ticket:', error);
      setError('Hubo un problema al crear el ticket. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <FormContainer>
        <Title>Crear Ticket</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Título"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            required
          />
          <Textarea
            placeholder="Descripción"
            value={ticket.description}
            onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
            required
          />
          <Select
            value={ticket.urgency}
            onChange={(e) => setTicket({ ...ticket, urgency: e.target.value })}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </Select>
          {/* Selector de área */}
          <AreaSelect
            selectedArea={ticket.area}
            onChange={(value) => setTicket({ ...ticket, area: value })}
          />
          {/* Selector de categoría */}
          <CateSelect
            selectedCate={ticket.categoria}
            onChange={(value) => setTicket({ ...ticket, categoria: value })}
          />
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".jpg,.png,.pdf"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Ticket'}
          </Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default CreateTicketPage;
