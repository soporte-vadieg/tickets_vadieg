const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const areaRutes = require('./routes/areaRutes');
const cateRoutes = require('./routes/cateRoutes');
dotenv.config();
const app = express();
const path = require('path');

// Conexión a la base de datos
/*db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos.');
    }
});*/

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);


app.use('/api/tickets', ticketRoutes);
app.use('/api/areas',areaRutes);
app.use('/api/categorias',cateRoutes);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});

app.get('/api/tickets/:id/history', async (req, res) => {
    const { id } = req.params;
    try {
        const history = await db.query("SELECT * FROM historial_ticket WHERE ticket_id = ? ORDER BY fecha_cambio DESC", [id]);
        res.json(history);
    } catch (error) {
        console.error("Error al obtener el historial:", error);
        res.status(500).json({ message: "Error al obtener el historial del ticket" });
    }
});
//Actualizar ticket y enivar al historial
app.put('/api/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const { status, assigned_to, observacion } = req.body;

    try {
        // Obtener el ticket actual antes de actualizarlo
        const ticketActual = await db.query("SELECT * FROM tickets WHERE id = ?", [id]);

        if (!ticketActual.length) {
            return res.status(404).json({ message: "Ticket no encontrado" });
        }

        // Actualizar el ticket con el nuevo estado, asignado y observación
        await db.query(
            "UPDATE tickets SET status = ?, assigned_to = ?, observacion = ? WHERE id = ?",
            [status, assigned_to, observacion, id]
        );

        // Insertar en historial_ticket
        await db.query(
            "INSERT INTO historial_ticket (ticket_id, status_anterior, status_nuevo, fecha_cambio, observacion) VALUES (?, ?, ?, NOW(), ?)",
            [id, ticketActual[0].status, status, observacion]
        );

        res.json({ message: "Ticket actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el ticket:", error);
        res.status(500).json({ message: "Error al actualizar el ticket" });
    }
});
// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
