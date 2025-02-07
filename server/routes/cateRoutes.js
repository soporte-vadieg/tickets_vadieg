const express = require('express');
const { getCategorias} = require('../controllers/cateController');
const router = express.Router();

//Llamar a las Categorias
router.get('/categorias', getCategorias );

module.exports = router;