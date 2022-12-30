const express = require('express');
const router = express.Router();
const Joker = require('../controllers/joker');

router.post('/joker/apostar', Joker.apostar)


// Comandos orquestrador Joker

router.post('/jokercommand/abrirapostas', Joker.abrirApostas)
router.post('/jokercommand/calculaganhadores', Joker.calculaGanhadores)
router.get('/jokercommand/obterapostas', Joker.obterApostas)



module.exports = router; 