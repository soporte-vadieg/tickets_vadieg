const db = require('../config/db'); // Configuración de mysql2/promise
const sendEmail = require('../utils/mailer'); // Importar el mailer

// Obtener todos los tickets
const getTickets = async (req, res) => {
    try {
        const [results] = await db.execute(`
          SELECT 
                tickets.id, 
                tickets.title, 
                tickets.description, 
                tickets.status, 
                tickets.urgency,
                tickets.file_path, 
                tickets.created_at, 
                areas.name AS area_nombre, 
                categoria.name AS categoria_nombre, 
                IFNULL(users_assigned.full_name, 'No asignado') AS assigned_user,
                users_creator.full_name AS created_user,
                users_creator.role AS created_user_role  -- Aquí traemos el rol del usuario creador
            FROM tickets 
            JOIN areas ON tickets.id_area = areas.id 
            JOIN categoria ON tickets.id_categoria = categoria.id 
            LEFT JOIN users AS users_assigned ON tickets.assigned_to = users_assigned.id 
            JOIN users AS users_creator ON tickets.created_by = users_creator.id 
            ORDER BY tickets.id DESC;
        `);

        res.json(results);
    } catch (err) {
        console.error('Error al obtener tickets:', err);
        return res.status(500).json({ message: 'Error al obtener tickets', error: err.message });
    }
};
// Obtener el email de un usuario
const getUserEmail = async (userId) => {
    try {
        const [rows] = await db.execute('SELECT email FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            return null; // Usuario no encontrado
        }
        return rows[0].email; // Retorna el correo electrónico
    } catch (error) {
        console.error('Error al obtener el correo del usuario:', error.message);
        throw error;
    }
};
//Obtener el mail del area
const getEmailsByArea = async (id_area) => {
    const query = 'SELECT emails FROM areas WHERE id = ?';
    const [rows] = await db.execute(query, [id_area]);
    return rows.length > 0 ? rows[0].emails.split(',') : [];
};

// Obtener lista de usuarios
const getUsers = async (created_by) => {
    const query = 'SELECT full_name FROM users where id = ?';
    const [rows] = await db.execute(query, [created_by]);
    return rows.length > 0 ? rows[0].full_name.split(',') : [];
};
// Crear un nuevo ticket
const createTicket = async (req, res) => {
    const { title, description, urgency, created_by, id_area, id_categoria } = req.body;
    const file = req.file;
    let filePath = null;

    if (file) {
        filePath = file.path.replace(/\\/g, '/');
    }

    if (!title || !description || !urgency || !created_by || !id_area || !id_categoria) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const query = 'INSERT INTO tickets (title, description, urgency, created_by, file_path, id_area, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {

        const recipients = await getEmailsByArea(id_area);
        const recipients1 = await getUserEmail(created_by);
       

        console.log("Esto son los mails extraidos:" ,recipients,recipients1);
        const userName = await getUsers(created_by);

        if (recipients.length === 0) {
            return res.status(400).json({ message: 'Área no válida o sin destinatarios.' });
        }
        // Ejecuta la consulta usando el pool de promesas
        const [result] = await db.execute(query, [title, description, urgency, created_by, filePath, id_area, id_categoria]);
        console.log('Resultado de la inserción:', result);

        const ticketId = result.insertId; // Obtiene el ID del ticket creado
        if (!ticketId) {
            return res.status(500).json({ message: 'No se pudo crear el ticket.' });
        }
   
        const subject = `Ticket creado: ${title}`;
        const text = `
            Se ha creado un nuevo ticket con los siguientes detalles:

            Título: ${title}
            Descripción: ${description}
            Prioridad: ${urgency}
            Fecha de creación: ${new Date().toLocaleDateString()}
            Solicitante: ${userName} 

            Gracias,
            Equipo de Sistemas VADIEG
        `;
            // Combinar recipients y recipients1 en un solo array
                const allRecipients = [...recipients]; 
                if (recipients1) {
                    allRecipients.push(recipients1);
                }

                try {
                    await sendEmail(allRecipients, subject, text);
                } catch (emailError) {
                    console.error("Error enviando email:", emailError);
                    return res.status(500).json({ message: 'Ticket creado, pero fallo el envío de email.' });
                }

        res.status(201).json({ message: 'Ticket creado con éxito.', ticketId });
    } catch (error) {
        console.error('Error al crear el ticket:', error);
        res.status(500).json({ message: 'Error al crear el ticket', error: error.message });
    }
};
// Actualizar un ticket existente
const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { status, assigned_to ,title} = req.body;   


    // Validaciones
    if (!status && !assigned_to) {
        return res.status(400).json({ message: 'Debe proporcionar al menos status o assigned_to para actualizar.' });
    }

    // Si se está asignando un ticket, validar el usuario y enviar correo
    if (assigned_to) {
        const userEmail = await getUserEmail(assigned_to);
        if (!userEmail) {
            return res.status(404).json({ message: 'Usuario asignado no encontrado.' });
        }

        const subject = `Nuevo Ticket Asignado: ${id}`;
        const text = `
            Se te ha asignado un nuevo ticket con los siguientes detalles:

            ID del Ticket: ${id}            
            Estado: ${status || 'Sin cambios'}
            Fecha de asignación: ${new Date().toLocaleDateString()}

            Gracias,
            Equipo de Sistemas VADIEG
        `;

        try {
            await sendEmail(userEmail, subject, text);
            console.log('Correo enviado al usuario asignado.');
        } catch (error) {
            console.error('Error al enviar el correo al usuario asignado:', error);
            return res.status(500).json({ message: 'Error al enviar correo al usuario asignado.' });
        }
    }

    // Construir la consulta dinámicamente
    let query = 'UPDATE tickets SET ';
    const queryParams = [];
    
    if (status) {
        query += 'status = ?, ';
        queryParams.push(status);
    }
    
    if (assigned_to) {
        query += 'assigned_to = ?, ';
        queryParams.push(assigned_to);
    }

    // Eliminar la última coma y agregar la cláusula WHERE
    query = query.slice(0, -2) + ' WHERE id = ?';
    queryParams.push(id);

    try {
        const [result] = await db.execute(query, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ticket no encontrado.' });
        }

        res.json({ message: 'Ticket actualizado con éxito.' });
    } catch (err) {
        console.error('Error al actualizar ticket:', err);
        return res.status(500).json({ message: 'Error al actualizar ticket', error: err.message });
    }
};
// Obtener todas las áreas
const getAreas = async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM areas');
        res.json(results);
    } catch (err) {
        console.error('Error al obtener áreas:', err);
        return res.status(500).json({ message: 'Error al obtener las áreas', error: err.message });
    }
};
const getTicketById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute('SELECT * FROM tickets WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el ticket:', error);
        res.status(500).json({ message: 'Error al obtener el ticket', error: error.message });
    }
};
module.exports = { getTickets, createTicket, updateTicket, getAreas, getUserEmail,getTicketById };
