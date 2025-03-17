const db = require('../config/db'); // Importamos la configuración de la base de datos
const path = require('path');
const {fs} = require('fs');

// Obtener todos los manuales
const getManuales = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM manuales ORDER BY id DESC');
    res.status(200).json(results);
  } catch (err) {
    console.error("Error al obtener los contenidos:", err);
    return res.status(500).json({ message: 'Error al obtener los contenidos.' });
  }
};

// Crear un nuevo manual
const createManual = async (req, res) => {
  console.log('Datos recibidos:', req.body); // Verifica que los datos estén llegando correctamente

  const { titulo, descripcion, usuario_subio, fecha_subida } = req.body;
  let filePath = req.file ? `/uploads/${req.file.filename}` : null; // ✅ Guardar ruta del archivo

  try {
    const [result] = await db.execute(
      'INSERT INTO manuales (titulo, descripcion, url_documento, usuario_subio, fecha_subida) VALUES (?, ?, ?, ?, ?)', 
      [titulo, descripcion, filePath, usuario_subio, fecha_subida]
    );

    if (result && result.insertId) {
      res.status(201).json({ id: result.insertId, message: 'Manual creado correctamente' });
    } else {
      res.status(500).json({ message: 'No se pudo obtener el ID del manual creado' });
    }
  } catch (err) {
    console.error('Error al crear manual:', err);
    res.status(500).json({ message: 'Error al crear manual' });
  }
};

// Descargar un archivo
const downloadManual = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('SELECT url_documento FROM manuales WHERE id = ?', [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    const filePath = path.join(__dirname, '..', result[0].url_documento); // Ruta completa

    // Verificar si el archivo existe en el servidor
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Archivo no encontrado en el servidor' });
    }

    res.download(filePath); // 🔥 Forzar descarga
  } catch (err) {
    console.error('Error al descargar el archivo:', err);
    res.status(500).json({ message: 'Error al descargar el archivo' });
  }
};

module.exports = { getManuales, createManual, downloadManual };
