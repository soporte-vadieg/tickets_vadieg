import React from 'react';
import ContentSection from '../components/HomeContentSection'; // Importa el componente de secciones de contenido
import Footer from '../components/Footer'; // Importar el pie de página
import '../styles/Home.css'; // Importamos el archivo de estilos
import Navbar from '../pages/Navbar'; // Importa la Navbar

const Home = () => {
    return (
        
        <div>
             <Navbar /> {/* Agregamos la Navbar */}

            <div className="grupo-secciones">
                {/* Grupo 1: Cumpleaños y Empleado Nuevo */}
                <div className="seccion-grupo">
                    <ContentSection tipo="" />                
                </div>


            </div>
            <Footer /> {/* Añadir el pie de página aquí */}
        </div>

    );
};

export default Home;