const express = require('express');
const router = express.Router();
const Servidor = require('../controllers/servidor');

router.post('/servidor/sinal', Servidor.enviaSinal)
router.get('/sinal/obtem',Servidor.coletaSinal)

module.exports = router; 