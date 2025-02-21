const express = require('express');
const { getTickets, createTicket, updateTicket ,getUserEmail} = require('../controllers/ticketController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer'); // Importa multer
const db = require('../config/db'); // Configuración de conexión a la base de datos
// Configuración de almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix); // Genera un nombre único para el archivo
    },
});
// Crear la instancia de multer
const upload = multer({ storage }); // Define el middleware "upload"
// Obtener todos los tickets (protegido)
router.get('/', verifyToken, getTickets);

router.post('/get-user-email', getUserEmail);
// Crear un nuevo ticket (protegido)
router.post('/tickets-create', upload.single('file'), createTicket);
// Actualizar un ticket existente (protegido)
router.put('/:id', verifyToken, updateTicket);

router.get('/tickets', async (req, res) => {
    try {
        const query = `
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
        `;
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los tickets');
    }
});


module.exports = router;
