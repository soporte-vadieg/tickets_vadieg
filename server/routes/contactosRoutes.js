const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { getContactos} = require('../controllers/contactosController');



router.get('/contactos', getContactos);


module.exports = router;