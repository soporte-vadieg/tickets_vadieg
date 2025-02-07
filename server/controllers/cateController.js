const db = require('../config/db'); // Configuración de mysql2/promise

// Obtener todas las categorías
const getCategorias = async (req, res) => {
    try {
        // Realizamos la consulta con promesas
        const [results] = await db.execute('SELECT id, name, description FROM categoria');
        res.status(200).json(results);
    } catch (err) {
        console.error("Error al obtener las categorías:", err);
        return res.status(500).json({ message: 'Error al obtener las categorías.' });
    }
};

module.exports = { getCategorias };
