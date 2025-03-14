const express = require('express');
const db = require('../config/db');
const router = express.Router();
const { getManuales } = require('../controllers/manualesController.js');


router.get('/manuales', getManuales);

module.exports = router;