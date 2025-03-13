const db = require('../config/db'); // Configuración de mysql2/promise


// Obtener todas las contenidos
const getContactos = async (req, res) => {
    try {
        // Realizamos la consulta con promesas
        const [results] = await db.execute('SELECT * FROM contactos ORDER BY id desc');
        res.status(200).json(results);
    } catch (err) {
        console.error("Error al obtener los contenidos:", err);
        return res.status(500).json({ message: 'Error al obtener las categorías.' });
    }
};


module.exports = { getContactos };
