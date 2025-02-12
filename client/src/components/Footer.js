import React from 'react';
import '../styles/Footer.css'; // Archivo para los estilos del pie de página

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} VADIEG SA. Todos los derechos reservados.</p>
                <p>
                    <a href="/about" className="footer-link">Acerca de</a> | 
                    <a href="/contact" className="footer-link">Contacto</a> | 
                    <a href="/privacy" className="footer-link">Política de privacidad</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
