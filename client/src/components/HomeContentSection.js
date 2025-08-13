import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import '../styles/HomeContent.css';

const ContentSection = () => {
    const [contenidos, setContenidos] = useState([]);
    console.log(contenidos);
    
    useEffect(() => {
        // Solicitar datos al backend
        axios.get('http://192.168.1.44:5000/api/contenidos')
            .then((response) => {
                setContenidos(response.data); // Guardar datos obtenidos
            })
            .catch((err) => {
                console.error('Error al obtener contenidos:', err);
            });
    }, []);

    // Filtrar los contenidos según su clase
    const novedades = contenidos.filter(contenido => contenido.clase === 'Novedades');
    const documentacion = contenidos.filter(contenido => contenido.clase === 'Documentación');

    return (
        <div className="content-section">
            {/* Sección de Novedades */}
            <h2 className="section-title">Novedades</h2>
            {novedades.length === 0 ? (
                <p className="no-content">No hay novedades disponibles.</p>
            ) : (
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={3} // Muestra tres contenidos a la vez
                    breakpoints={{
                        640: { slidesPerView: 1 }, // En pantallas pequeñas, 1 contenido
                        768: { slidesPerView: 2 }, // En pantallas medianas, 2 contenidos
                        1024: { slidesPerView: 3 }, // En pantallas grandes, 3 contenidos
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true} 
                    grabCursor={true} 
                >
                    {novedades.map((contenido) => (
                        <SwiperSlide key={contenido.id}>
                            <div className="content-card">
                                <h3 className="content-title">{contenido.titulo}</h3>
                                <p className="content-description">{contenido.descripcion}</p>
                                <p className="content-date">
                                    <strong>Fecha:</strong> {new Date(contenido.fecha).toLocaleDateString()}
                                </p>
                                {/* Mostrar imagen si existe archivo */}
                                {contenido.archivo && (
                                    <div className="content-image">
                                        <img
                                            src={`http://192.168.1.44:5000/${contenido.archivo}`} // ya incluye 'uploads/...'
                                            alt="Contenido"
                                            style={{ maxWidth: '100px', height: 'auto' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Sección de Documentación */}
            <h2 className="section-title">Documentación</h2>
            {documentacion.length === 0 ? (
                <p className="no-content">No hay documentación disponible.</p>
            ) : (
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={3} // Muestra tres contenidos a la vez
                    breakpoints={{
                        640: { slidesPerView: 1 }, // En pantallas pequeñas, 1 contenido
                        768: { slidesPerView: 2 }, // En pantallas medianas, 2 contenidos
                        1024: { slidesPerView: 3 }, // En pantallas grandes, 3 contenidos
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}  
                    grabCursor={true} 
                >
                    {documentacion.map((contenido) => (
                        <SwiperSlide key={contenido.id}>
                            <div className="content-card">
                                <h3 className="content-title">{contenido.titulo}</h3>
                                <p className="content-description">{contenido.descripcion}</p>
                                <p className="content-date">
                                    <strong>Fecha:</strong> {new Date(contenido.fecha).toLocaleDateString()}
                                </p>
                                {/* Mostrar enlace de descarga si existe archivo */}
                                {contenido.archivo && (
                                    <div className="content-file">
                                        <a
                                            href={`http://192.168.1.44:5000/uploads/${contenido.archivo}`}
                                            download={contenido.archivo} // Esto fuerza la descarga del archivo
                                        >
                                            Descargar Documento
                                        </a>
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default ContentSection;
