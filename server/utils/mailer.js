const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar variables de entorno

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Permite certificados autofirmados
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: `"Soporte de Tickets" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });
        console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

module.exports = sendEmail;
