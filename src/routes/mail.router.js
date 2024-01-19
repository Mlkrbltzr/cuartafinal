//mail.router.js
// Importa el módulo dotenv para cargar variables de entorno desde un archivo .env
import dotenv from 'dotenv';
// Importa el módulo express para la creación de aplicaciones web
import express from 'express';
// Importa el módulo nodemailer para el envío de correos electrónicos
import nodemailer from 'nodemailer';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Crea un objeto transporter usando nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, // Usa la variable de entorno para el usuario del correo
        pass: process.env.EMAIL_PASS // Usa la variable de entorno para la contraseña del correo
    }
});

// Crea un objeto Router de express
const router = express.Router();

// Define una ruta POST '/enviar-correo' que maneja la solicitud de envío de correo
router.post('/enviar-correo', (req, res) => {
    // Extrae la dirección de correo y el mensaje del cuerpo de la solicitud
    const { email, mensaje } = req.body;
    // Utiliza el mensaje del cuerpo de la solicitud
    const messageToSend = mensaje;

    // Define las opciones del correo
    const mailOptions = {
        from: 'ge.astudillo.aray@gmail.com', //tucorreo@gmail.com
        to: email, // Utiliza la dirección de correo ingresada en el formulario como destinatario
        subject: 'Mensaje después del login',
        text: messageToSend // Mensaje personalizado para el usuario
    };

    // Envía el correo usando el objeto transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // Maneja errores en caso de que ocurran durante el envío del correo
            console.log('Error enviando email:', error.message);
            res.status(500).json({ error: 'Error al enviar el correo' });
        } else {
            // Muestra un mensaje en la consola si el correo se envía con éxito
            console.log('Email enviado');
            res.status(200).json({ message: 'Correo enviado con éxito' });
        }
    });
});

// Exporta el objeto Router como el módulo predeterminado
export default router;
// Exporta el objeto transporter para que pueda ser utilizado en otros archivos
export { transporter };
