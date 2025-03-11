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
app.use('/api/', conteRoutes);

app.use('/api/',areaRutes);
app.use('/api/',cateRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//app.use('/api/');
/*
//Funciones de contenidos
app.get('/api/contenidos', async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM contenidos ORDER BY id DESC');
      res.status(200).json(results);
    } catch (err) {
      console.error('Error al obtener contenidos:', err);
      res.status(500).send('Error en la base de datos');
    }
  });
//Eliminar contenido  
app.delete('/api/contenidos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    db.query('DELETE FROM contenidos WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).send('Error al eliminar el contenido');
      if (results.affectedRows === 0) {
        return res.status(404).send('Contenido no encontrado');
      }
      res.status(204).send(); // Respuesta exitosa sin contenido
    });
  });
// Ruta para agregar contenido nuevo con archivo
app.post('/api/contenidos', upload.single('archivo'), (req, res) => {
    console.log('Datos recibidos:', req.body); // Inspeccionar los datos del formulario
    console.log('Archivo recibido:', req.file); // Inspeccionar el archivo recibido
  
    const { titulo, descripcion,fecha, clase } = req.body;
    const archivo = req.file ? req.file.filename : null; // Obtener el nombre del archivo si existe
  
    // Validar los datos
    if (!titulo || !descripcion || !fecha  || !clase ) {
      return res.status(400).json({ message: 'Todos los campos son requeridos, incluido el archivo' });
    }
  
    
  
    // Insertar en la base de datos
    const query = 'INSERT INTO contenidos (titulo, descripcion,fecha, clase, archivo) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [titulo, descripcion, fecha,clase, archivo], (err, results) => {
      if (err) {
        console.error('Error al agregar contenido:', err); // Detalles del error
        return res.status(500).json({ message: 'Error al guardar el contenido' });
      }
  
      // Responder con el contenido agregado
      res.status(201).json({
        id: results.insertId,
        titulo,
        descripcion,
        clase,
        fecha,
        archivo,
      });
    });
  });
    
// Ruta para editar un contenido
app.put('/api/contenidos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // ID correcto
    const { titulo, descripcion,fecha,clase } = req.body;
  
    // Asegúrate de que los campos sean válidos
    if (!titulo || !descripcion || ! fecha|| !clase) {
      return res.status(400).send('Todos los campos son requeridos');
    }
  
    db.query('SELECT * FROM contenidos WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).send('Error al buscar el contenido');
      if (results.length === 0) {
        return res.status(404).send('Contenido no encontrado');
      }
  
      // Si el contenido existe, continuar con la actualización
      const query = 'UPDATE contenidos SET titulo = ?, descripcion = ?, fecha = ?, clase = ? WHERE id = ?';
      db.query(query, [titulo, descripcion, fecha,clase, id], (err, results) => {
        if (err) return res.status(500).send('Error al actualizar el contenido');
        res.status(200).send('Contenido actualizado');
      });
    });
  });
*/
// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});
app.get('/api/tickets/:id/history', (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM historial_ticket WHERE ticket_id = ? ORDER BY fecha_cambio DESC", [id], (err, results) => {
      if (err) {
          console.error("Error al obtener el historial:", err);
          return res.status(500).json({ message: "Error al obtener el historial del ticket" });
      }
      res.json(results);
  });
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
