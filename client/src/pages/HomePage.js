import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Importar el calendario
import 'react-calendar/dist/Calendar.css'; // Importar los estilos del calendario
import ContentSection from '../components/HomeContentSection';
import Footer from '../components/Footer';
import '../styles/Home.css'; // Importamos los estilos
import Navbar from '../pages/Navbar';

// Lista de eventos con fechas
const eventos = [
    { fecha: new Date(2025, 2, 11), titulo: 'Cumpleaños de Martin Pereyra'},
    { fecha: new Date(2025, 2, 11), titulo: 'Cumpleaños de Agustin Pereyra'},
    { fecha: new Date(2025, 2, 20), titulo: 'Reunión de equipo' },
    { fecha: new Date(2025, 2, 25), titulo: 'Capacitación en React' },
];
// Lista de contactos
const contactos = [
    { nombre: 'Juan Pérez', telefono: '123-456-7890' },
    { nombre: 'María Gómez', telefono: '987-654-3210' },
    { nombre: 'Carlos López', telefono: '555-123-4567' },
    { nombre: 'Ana Martínez', telefono: '444-567-8901' },
];
    // Ejemplo de indicadores reales
    const progreso = 75; // 75% completado
    const estado = 'activo'; // puede ser 'activo', 'inactivo', 'pendiente'
    const tareasPendientes = 5; // Número de tareas pendientes

const Home = () => {
    const [date, setDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState('');

    
    // Filtra eventos para la fecha seleccionada
    const eventosDelDia = eventos.filter(evento =>
        evento.fecha.toDateString() === date.toDateString()
    );
    // Filtra los contactos según el término de búsqueda
    const filteredContacts = contactos.filter(contacto =>
        contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='Principal'>
        <Navbar /> {/* Agregamos la Navbar */}

        <div className='home'>

        <div className="grupo-secciones">
            <div className='contendorIzquierdo'>
           
                {/* Calendario */}
                <div className="calendario-container">
                    <h2>Calendario de Eventos</h2>
                    <Calendar 
                        onChange={setDate} 
                        value={date}
                        tileContent={({ date }) => {
                            const hayEvento = eventos.some(evento => 
                                evento.fecha.toDateString() === date.toDateString()
                            );
                            return hayEvento ? <span className="evento-dot">●</span> : null;
                        }}
                    />
                    {/* Mostrar eventos debajo del calendario */}
                    <div className="eventos-del-dia">
                    <h4>Eventos del <br/>{date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}:</h4>
                    {eventosDelDia.length > 0 ? (
                        <ul>
                            {eventosDelDia.map((evento, index) => (
                                <li key={index}>{evento.titulo}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay eventos para esta fecha.</p>
                    )}
                </div>

                </div>
                <div className="indicadores-container">
                            <h3>Sugerencias /Ideas </h3>
                            <div className="indicadores">
                                {/* Indicador de progreso */}
                                <div className="indicador">
                                    <div className="indicador-circle" style={{ backgroundColor: '#4CAF50' }} />
                                    <p>Sugerencias sobre el sistema nuevo o ideas de mejoras </p>
                                </div>  
                                                        {/* Enlace al formulario */}
                        <div className="formulario-container">
                        
                        <a 
                            href="https://192.168.1.215/api/pageSuge" 
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
    
                <div className="seccion-grupo">
                    <ContentSection/>
                  {/*  <button href="">Agregar Contenido</button>  */}          
                </div>
                 {/* Buscador de contactos */}
                 <div className="contenedor-derecho">
                            <div className="buscador-container">
                                    <h3>Buscar Contactos</h3>
                                    <input
                                        type="text"
                                        placeholder="Buscar por nombre..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <ul>
                                        {filteredContacts.length > 0 ? (
                                            filteredContacts.map((contacto, index) => (
                                                <li key={index}>{contacto.nombre} - {contacto.telefono}</li>
                                            ))
                                        ) : (
                                            <p>No se encontraron contactos.</p>
                                        )}
                                    </ul>
                                </div>
                    {/* Sección de indicadores reales */}
                        <div className="indicadores-container">
                            <h2>Indicadores Tickets Sistema</h2>
                            <div className="indicadores">
                                {/* Indicador de progreso */}
                                <div className="indicador">
                                    <div className="indicador-circle" style={{ backgroundColor: '#4CAF50' }} />
                                    <p>Total: {progreso}%</p>
                                </div>

                                {/* Indicador de estado */}
                                <div className="indicador">
                                    <div className={`indicador-circle ${estado}`} />
                                    <p>Total cerrados: {estado.charAt(0).toUpperCase() + estado.slice(1)}</p>
                                </div>

                                {/* Indicador de tareas pendientes */}
                                <div className="indicador">
                                    <div className="indicador-circle" />
                                    <p>Tickets Pendientes: {tareasPendientes}</p>
                                </div>
                        </div>
                    </div>
                    <div className="indicadores-container">
    <h2>Menú Comida Diaria</h2>
    
                    <div className="indicadores">
                        {/* Mensaje de consulta */}
                        <h6 className="consulta-texto">
                            Cualquier consulta pueden hablar con <strong>Julieta López</strong>.
                        </h6>
                                       
                        {/* Enlace al formulario */}
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
        <Footer /> {/* Añadir el pie de página aquí */}
        </div>
    );
};

export default Home;
