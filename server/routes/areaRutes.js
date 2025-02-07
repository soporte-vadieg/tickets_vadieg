const express = require('express');
const { getAreas} = require('../controllers/areaController');
const router = express.Router();

//Llamar a las areas
router.get('/areas', getAreas );

module.exports = router;