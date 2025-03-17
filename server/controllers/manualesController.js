// controllers/manualesController.js
const db = require('../config/db'); // Importamos la configuración de la base de datos

// Función para obtener todos los manuales
const getManuales = async (req, res) => {
  try {
    // Realizamos la consulta con promesas
    const [results] = await db.execute('SELECT * FROM manuales ORDER BY id DESC');
    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener los contenidos:", err);
    return res.status(500).json({ message: 'Error al obtener los contenidos.' });
  }
};

// Función para crear un nuevo manual
const createManual = async (req, res) => {
  console.log('Datos recibidos:', req.body); // Verifica que los datos estén llegando correctamente

  const { titulo, descripcion, url_documento, usuario_subio, fecha_subida } = req.body;
  
  try {
    // Ejecutamos la consulta de inserción
    const [result] = await db.execute(
      'INSERT INTO manuales (titulo, descripcion, url_documento, usuario_subio, fecha_subida) VALUES (?, ?, ?, ?, ?)', 
      [titulo, descripcion, url_documento, usuario_subio, fecha_subida]
    );

    console.log('Resultado de la inserción:', result);

    if (result && result.insertId) {
      // Si se creó el manual correctamente, devolvemos el ID y el mensaje
      res.status(201).json({ id: result.insertId, message: 'Manual creado correctamente' });
    } else {
      res.status(500).json({ message: 'No se pudo obtener el ID del manual creado' });
    }
  } catch (err) {
    console.error('Error al crear manual:', err);
    res.status(500).json({ message: 'Error al crear manual' });
  }
};

module.exports = { getManuales, createManual };
