const express = require('express');
const { getContenidos} = require('../controllers/conteController');
const router = express.Router();

//Llamar a los contenidos
router.get('/contenidos', getContenidos );

module.exports = router;