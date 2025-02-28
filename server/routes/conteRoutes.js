const express = require('express');
const multer = require('multer');
const { getContenidos,editContenido} = require('../controllers/conteController');
const conteController = require('../controllers/conteController');
const router = express.Router();

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
const upload = multer({ storage });


// Llamar a los contenidos
router.get('/contenidos', getContenidos );

// Agregar contenido
router.post('/contenidos', upload.single('archivo'),conteController.addContenido);

// Editar contenido
router.put('/contenidos/:id', upload.single('archivo'), editContenido);

// Eliminar contenido
router.delete('/contenidos/:id', conteController.deleteContenido);

// Obtener un contenido por su ID
router.get('/contenidos/:id', conteController.getContenidoById);

module.exports = router;