const express = require('express');
const router = express.Router();
const { getManuales ,createManual,downloadManual} = require('../controllers/manualesController.js');
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
// Crear la instancia de multer
const upload = multer({ storage }); // Define el middleware "upload"



router.get('/manuales', getManuales);
router.post('/create-manuales',upload.single('url_documento'),createManual);
router.get('/manuales/:id/download', downloadManual); // ✅ Ruta de descarga


module.exports = router;