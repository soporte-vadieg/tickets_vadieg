import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import '../styles/HomeContent.css';

const swiperWrapper = document.querySelector('.swiper-wrapper');
const slides = document.querySelectorAll('.swiper-slide');

if (slides.length < 5) { // Si hay pocos slides, duplicarlos
  slides.forEach(slide => {
    let clone = slide.cloneNode(true);
    swiperWrapper.appendChild(clone);
  });
}


const ContentSection = () => {
    const [contenidos, setContenidos] = useState([]);

    useEffect(() => {
        // Solicitar datos al backend
        axios.get('http://192.168.1.215:5000/api/contenidos')
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
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
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
                                            src={`http://192.168.1.215:5000/uploads/${contenido.archivo}`}
                                            alt={contenido.archivo.originalname}
                                            style={{ maxWidth: '150px', height: 'auto' }}
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
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
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
                                    href={`http://192.168.1.215:5000/uploads/${contenido.archivo}`}
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
