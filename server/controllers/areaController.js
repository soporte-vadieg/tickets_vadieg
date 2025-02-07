const db = require('../config/db'); // Configuración de mysql2/promise

// Obtener todas las áreas
const getAreas = async (req, res) => {
    try {
        // Realizamos la consulta con promesas
        const [results] = await db.execute('SELECT id, name ,emails FROM areas');
        res.status(200).json(results);
    } catch (err) {
        console.error("Error al obtener las áreas:", err);
        return res.status(500).json({ message: 'Error al obtener las áreas.' });
    }
};




module.exports = { getAreas };
