const express = require('express');
const router = express.Router();
const { getManuales ,createManual} = require('../controllers/manualesController.js');


router.get('/manuales', getManuales);
router.post('/create-manuales',createManual);

module.exports = router;