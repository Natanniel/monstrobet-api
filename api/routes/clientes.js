const express = require('express');
const router = express.Router();
const Clientes = require('../controllers/clientes');


router.get('/email', Clientes.verificaSeEmailJaEstaCadastrado);
router.get('/verificaestalogando',Clientes.verificaSeEstaLogando)
router.get('/senhalogin',Clientes.senhaLogin)
router.get('/cliente',Clientes.obtemCliente)
router.get('/cliente/id', Clientes.obtemClienteID)

router.post('/gerar',Clientes.gerarLicencaTeste)
router.post('/emaillogin', Clientes.emailLogin);
router.post('/hall',Clientes.hall)
router.post('/suporte',Clientes.suporte)
router.post('/interrompido', Clientes.interrompido)

// CONFIGURACAO =======================================================
router.put('/double',Clientes.double)
router.put('/crash',Clientes.crash)
router.put('/usuario/meta',Clientes.atualizaMeta)
router.put('/interromper', Clientes.interromper )

router.put('/funcao/editar/senha',Clientes.funcaoSenha)
router.post('/funcao/editar/senha',Clientes.alterarSenha)
router.post('/captcha',Clientes.captcha)

// OPERACAO ===========================================================
router.post('/iniciar', Clientes.iniciar)
router.get('/clientesemfila', Clientes.clientesEmFila)

module.exports = router; 