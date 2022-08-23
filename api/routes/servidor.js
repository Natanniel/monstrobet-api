const express = require('express');
const router = express.Router();
const Servidor = require('../controllers/servidor');

router.get('/servidor', Servidor.seleciona)
//router.get('/servidor', Servidor.seleciona)


router.post('/servidor/novo', Servidor.criarNovo);
router.post('/servidor/iniciar', Servidor.iniciarCliente)
router.post('/servidor/metabatida', Servidor.metabatida)

router.put('/servidor/cancelar', Servidor.cancelaIniciar)
module.exports = router; 