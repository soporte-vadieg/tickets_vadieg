import styled from 'styled-components';
import backgroundImg from '../assets/imagen_fondo.jpg'; // Ajusta la ruta según corresponda

export const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-image: url(${backgroundImg});
 // background-size: contain; /* Ajusta la imagen sin distorsionar */
  background-repeat: repeat-y; /* Se repite verticalmente */
  background-position:  top; /* Centrado y desde arriba */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8); /* Ajusta la opacidad según prefieras */
    z-index: 0;
  }
`;
export const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 20px;
  color: white;
`;

export const FormContainer = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  margin-top: 60px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
export const TicketGroup = styled.div`
  margin: 20px 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

export const Message = styled.p`
  color: ${(props) => (props.error ? 'red' : 'green')};
  font-weight: bold;
  text-align: center;
`;
