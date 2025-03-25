import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ContentSection from '../components/HomeContentSection';
import Footer from '../components/Footer';
import '../styles/Home.css';
import Navbar from '../pages/Navbar';
import axios from 'axios';

// Ejemplo de indicadores reales
const progreso = 75;
const estado = 'activo';
const tareasPendientes = 5;

const Home = () => {
    const [date, setDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState('');
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener contactos
    useEffect(() => {
        axios.get('http://192.168.1.215:5000/api/contactos')
            .then(response => {
                setContactos(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error al obtener los contactos');
                setLoading(false);
                console.error('Error al obtener los contactos:', error);
            });
    }, []);

    // Filtrar contactos por búsqueda
    const filteredContacts = contactos.filter(contacto =>
        contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isSearchActive = searchTerm !== '';

    // Verificar si hay cumpleaños para una fecha específica
    const cumpleañosDelDia = contactos.filter(contacto => {
        if (!contacto.fecha_nac) return false;
        const cumpleDate = new Date(contacto.fecha_nac);
        // Comparar solo día y mes
        return (
            cumpleDate.getDate() === date.getDate() &&
            cumpleDate.getMonth() === date.getMonth()
        );
    });

    // Verificar cumpleaños hoy para "Últimas Noticias"
    const cumpleañosHoy = contactos.filter(contacto => {
        if (!contacto.fecha_nac) return false;
        const cumpleDate = new Date(contacto.fecha_nac);
        const hoy = new Date();
        return (
            cumpleDate.getDate() === hoy.getDate() &&
            cumpleDate.getMonth() === hoy.getMonth()
        );
    });

    // Función para saber si hay cumpleaños en una fecha específica (para marcar calendario)
    const hayCumpleaños = (date) => {
        return contactos.some(contacto => {
            if (!contacto.fecha_nac) return false;
            const cumpleDate = new Date(contacto.fecha_nac);
            return (
                cumpleDate.getDate() === date.getDate() &&
                cumpleDate.getMonth() === date.getMonth()
            );
        });
    };

    return (
        <div className='Principal'>
            <Navbar />

            <div className='home'>
                <div className="grupo-secciones">
                    <div className='contendorIzquierdo'>
                        {/* Calendario */}
                        <div className="calendario-container">
                            <h2>Calendario de Eventos</h2>
                            <Calendar 
                                onChange={setDate} 
                                value={date}
                                tileContent={({ date }) =>
                                    hayCumpleaños(date) && <span className="evento-dot">🎂</span>
                                }
                            />
                            {/* Eventos del día */}
                            <div className="eventos-del-dia">
                                <h4>Cumpleaños del <br />{date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}:</h4>
                                {cumpleañosDelDia.length > 0 ? (
                                    <ul>
                                        {cumpleañosDelDia.map((contacto, index) => (
                                            <li key={index}>🎉 {contacto.nombre}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No hay cumpleaños para esta fecha.</p>
                                )}
                            </div>
                        </div>

                        {/* Sección de sugerencias */}
                        <div className="indicadores-container">
                            <h3>Sugerencias / Ideas </h3>
                            <div className="indicadores">
                                <div className="indicador">
                                    <div className="indicador-circle" style={{ backgroundColor: '#4CAF50' }} />
                                    <p>Sugerencias sobre el sistema nuevo o ideas de mejoras </p>
                                </div>  
                                <div className="formulario-container">
                                    <a 
                                        href="https://192.168.1.215/api/pageSuge" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="formulario-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            alert("La sección de Sugerencias e Ideas está en proceso de desarrollo. ¡Gracias por tu paciencia!");
                                        }}
                                    >
                                        Completa el formulario
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de contenido */}
                    <div className="seccion-grupo">
                        <ContentSection />
                    </div>

                    {/* Contenedor derecho */}
                    <div className="contenedor-derecho">
                        {/* Buscador de contactos */}
                        <div className="buscador-container">
                            <h3>Buscar Contactos</h3>
                            <input
                                type="text"
                                placeholder="Buscar por nombre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className={`contactos-lista ${isSearchActive ? 'expandido' : ''}`}>
                                {searchTerm && (
                                    <div>
                                        {loading ? (
                                            <p>Cargando contactos...</p>
                                        ) : error ? (
                                            <p>{error}</p>
                                        ) : (
                                            <ul>
                                                {filteredContacts.length > 0 ? (
                                                    filteredContacts.map((contacto, index) => (
                                                        <li key={index}>
                                                            {contacto.nombre} - {contacto.telefono} - {contacto.email}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p>No se encontraron contactos.</p>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Manuales y novedades      {cumpleañosHoy.length > 0 ? (
                                    <ul>
                                        {cumpleañosHoy.map((contacto, index) => (
                                            <li key={index}>🎂 Hoy es el cumpleaños de {contacto.nombre}</li>
                                        ))}
                                    </ul>
                                ) :*/}
                        <div className="indicadores-container">
                            <h3><Link to="/manuales" style={{ textDecoration: 'none', color: 'inherit' }}>Manuales y Procedimientos</Link></h3>
                            <div id="ultimas-noticias">
                                <h5>Últimas Noticias</h5>
                            
                                    <p>No hay novedades para hoy.</p>
                                
                            </div>
                        </div>

                        {/* Indicadores */}
                        <div className="indicadores-container">
                            <h2>Indicadores Tickets Sistema</h2>
                            <div className="indicadores">
                                <div className="indicador"><div className="indicador-circle" style={{ backgroundColor: '#4CAF50' }} /><p>Total: {progreso}%</p></div>
                                <div className="indicador"><div className={`indicador-circle ${estado}`} /><p>Total cerrados: {estado}</p></div>
                                <div className="indicador"><div className="indicador-circle" /><p>Tickets Pendientes: {tareasPendientes}</p></div>
                            </div>
                        </div>
                        <div className="indicadores-container">
                            <h3>Formulario Menu diario </h3>
                            <div className="indicadores">
                                <div className="indicador">
                                    <div className="indicador-circle" style={{ backgroundColor: '#4CAF50' }} />
                                    <p>Cualquier consulta preguntarle a Julieta Lopez </p>
                                </div>  
                                <div className="formulario-container">
                                    <a 
                                        href="https://forms.gle/mfARQy3crFuiigJf8" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="formulario-link"
                                      
                                    >
                                        Completa el formulario
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
