const express = require('express');
const { getContenidos,editContenido,addContenido} = require('../controllers/conteController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db');

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    },
});
// Crear la instancia de multer
const upload = multer({ storage }); // Define el middleware "upload"
// Obtener todos los tickets (protegido)
router.get('/contenidoNew', verifyToken, getContenidos);
// Crear un nuevo ticket (protegido)
router.post('/contenido-create', upload.single('file'), addContenido);
// Actualizar un ticket existente (protegido)
//router.put('/:id', editContenido);

router.get('/contenidos', async (req, res) => {
    try {
        const query = `
         SELECT * FROM contenidos ORDER BY id DESC;
        `;
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los tickets');
    }
});
module.exports = router;