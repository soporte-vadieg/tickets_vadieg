const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const areaRutes = require('./routes/areaRutes');
const cateRoutes = require('./routes/cateRoutes');
const conteRoutes = require('./routes/conteRoutes');
dotenv.config();
const app = express();
const path = require('path');
const multer = require('multer'); // Importa multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix); // Genera un nombre único para el archivo
    },
});
const upload = multer({ storage });


// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/', userRoutes);
app.use('/api/', ticketRoutes);
app.use('/api/',areaRutes);
app.use('/api/',cateRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/', conteRoutes);



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

// Ruta para agregar contenido nuevo con archivo
app.delete('/api/contenidos/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM contenidos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar contenido:', err);
      return res.status(500).json({ message: 'Error en el servidor', error: err });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contenido no encontrado' });
    }
    
    res.json({ message: 'Contenido eliminado correctamente' });
  });
});
// Ruta para editar un contenido
app.put('/contenidos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // ID correcto
    const { titulo, descripcion, clase } = req.body;
  
    // Asegúrate de que los campos sean válidos
    if (!titulo || !descripcion || !clase) {
      return res.status(400).send('Todos los campos son requeridos');
    }
  
    db.query('SELECT * FROM contenidos WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).send('Error al buscar el contenido');
      if (results.length === 0) {
        return res.status(404).send('Contenido no encontrado');
      }
  
      // Si el contenido existe, continuar con la actualización
      const query = 'UPDATE contenidos SET titulo = ?, descripcion = ?, clase = ? WHERE id = ?';
      db.query(query, [titulo, descripcion, clase, id], (err, results) => {
        if (err) return res.status(500).send('Error al actualizar el contenido');
        res.status(200).send('Contenido actualizado');
      });
    });
  });


// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
