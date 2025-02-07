import React, { useState,useEffect } from 'react';
import axios from 'axios';
import AreaSelect from '../components/AreaSelect';
import Navbar from '../pages/Navbar'; // Importa la Navbar
import { PageContainer, FormContainer, Input, Button, Message } from '../styles/Styles';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [id_area, setArea] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setFullName('');
        setUsername('');
        setPassword('');
        setEmail('');
        setArea('');
        setMessage('');
        setError(false);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log({ username, password, email, id_area, fullName });

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                username,
                password,
                email,
                id_area,
                full_name: fullName,
            });
            setMessage(response.data.message);
            setError(false);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error al registrar.');
            setError(true);
        }
    };

    return (
        <PageContainer>
            <Navbar /> {/* Agregamos la Navbar */}
            <FormContainer>
                <h2>Registro de Usuario</h2>
                {message && <Message error={error}>{message}</Message>}
                <form onSubmit={handleRegister}>
                    <div>
                        <label>Nombre Completo:</label>
                        <Input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Usuario:</label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <AreaSelect selectedArea={id_area} onChange={setArea} />
                    <div>
                        <label>Contraseña:</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit">Registrarse</Button>
                </form>
            </FormContainer>
        </PageContainer>
    );
};

export default Register;