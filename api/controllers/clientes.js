
class Clientes {

    async cadastrar(req, res) {
        let Clientes = require('../models/clientes')
        let { nome, sobrenome, email, senha, cpf } = req.body

        console.log(email)
        // Valida email ja cadastrado
        let cliente = await Clientes.findOne({ email: email })
        if (!cliente) {

            cliente = await Clientes.findOne({ cpf: cpf })
            if (!cliente) {

                cliente = new Clientes({
                    nome, sobrenome, email, senha, cpf
                })
                await cliente.save()
                res.send()

            } else {
                res.status(500).send({ message: "CPF ja registrado no sistema !" })
            }

        } else {
            res.status(500).send({ message: "Email ja registrado no sistema !" })
        }



        // Valida email 


        // await cliente.save()
        // console.log('cadastraro realizado com sucesso !')

    }

    async autenticacao(req, res) {

        let { email, senha } = req.body
        let Clientes = require('../models/clientes')
        let usuario = await Clientes.findOne({ email, senha })

        if (usuario) {
            const jwt = require("jsonwebtoken");
            res.json({
                token: jwt.sign({ usuario: usuario._id }, "b03e148fc2d70bb33bfbbf15b7eee9e7", { expiresIn: '7d' })
            });

        } else {
            res.status(500).send({ message: "Usuario ou senha invalido" })
        }
    }

    async dados(req, res) {
        // console.log(req.id)
        let Clientes = require('../models/clientes')

        let cliente = await Clientes.findOne({ _id: req.id })
        let dados = {
            saldo: cliente.saldo
        }

       // console.log(dados)
        res.send(dados)
    }













    async versao(req, res) {
        res.send({ versao: 1 })
    }


    async atualizaConfiguracoes(req, res) {
        let { crash, double, gale, qtdGale, id } = req.body

        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({ _id: id })
        cliente.configuracao.crash = crash;
        cliente.configuracao.double = double;
        cliente.configuracao.recuperacao.status = gale;
        cliente.configuracao.recuperacao.quantidade = qtdGale
        // console.log(req.body)
        await cliente.save()
        // console.log(cliente)
        res.send(cliente)
    }














    // ====================================================================
    async clientesEmFila(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({ 'operacao.status': 1 })
        if (cliente != null) {

            cliente.operacao.status = 2
            await cliente.save()
            res.send(cliente)
        } else {
            res.send(null)
        }

    }

    async verificaSeEmailJaEstaCadastrado(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.find({ email: req.query.email })
        res.send(cliente)
    }

    async gerarLicencaTeste(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = new Clientes({
            nome: 'Tester',
            email: req.body.email,
            senha: '123456',
            funcao: '',
            teste: true,
            plano: 0.05,
            admin: false,
            telegram: {
                chatID: '',
                tentativaChatID: '',
            },
            operacao: {
                meta: 0,
            },
            configuracao: {
                crash: false,
                double: false
            }
        })
        await cliente.save()
        res.send()

    }

    async emailLogin(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.find({ email: req.body.email })

        if (cliente.length > 0) {
            let aux = await Clientes.findOne({ email: req.body.email })
            aux.telegram.tentativaChatID = req.body.chatid
            await aux.save()
        }
        res.send(cliente)
    }

    async verificaSeEstaLogando(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.find({
            'telegram.tentativaChatID': req.query.chatid + ''
        })
        res.send(cliente)
    }


    async suporte(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            'telegram.chatID': req.body.chatid
        })
        cliente.pediuSuporte = true
        await cliente.save()
        res.send()

    }

    async hall(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            'telegram.chatID': req.body.chatid
        })
        cliente.funcao = ''
        await cliente.save()
        res.send()

    }

    async obtemCliente(req, res) {
        let Clientes = require('../models/clientes')

        let cliente = await Clientes.findOne({
            'chatid': req.params.chatid
        })

        res.send(cliente)
    }

    async obtemClienteID(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            _id: req.query.id
        })

        res.send(cliente)
    }

    async senhaLogin(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.find({
            'telegram.tentativaChatID': req.query.chatid,
            senha: req.query.senha
        })
        if (cliente.length > 0) {
            let aux = await Clientes.findOne({ 'telegram.tentativaChatID': req.query.chatid })
            aux.telegram.tentativaChatID = ''
            aux.telegram.chatID = req.query.chatid
            await aux.save()
        } else {
            let aux = await Clientes.findOne({ 'telegram.tentativaChatID': req.query.chatid })
            aux.telegram.tentativaChatID = ''
            await aux.save()
        }
        res.send(cliente)
    }

    async double(req, res) {

        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            'telegram.chatID': req.body.chatid
        })

        cliente.configuracao.double = req.body.double
        await cliente.save()
        res.send()
    }

    async crash(req, res) {

        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            'telegram.chatID': req.body.chatid
        })

        cliente.configuracao.crash = req.body.crash
        await cliente.save()
        res.send()
    }

    async atualizaMeta(req, res) {

        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            email: req.body.email
        })

        cliente.meta = req.body.meta
        await cliente.save()
        res.send()
    }

    async interromper(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            'telegram.chatID': req.body.chatid
        })

        cliente.operacao.status = 999
        await cliente.save()
        res.send()
    }

    async interrompido(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            _id: req.body.id
        })
        cliente.operacao.status = 0
        await cliente.save()
        res.send()
    }

    async iniciar(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            'telegram.chatID': req.body.chatid
        })
        cliente.operacao.status = 1
        cliente.save()
        res.send()
    }

    async funcaoSenha(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            'telegram.chatID': req.body.chatid
        })

        cliente.funcao = '✏ Alterar senha'
        await cliente.save()
        res.send()
    }

    async alterarSenha(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            'telegram.chatID': req.body.chatid
        })

        cliente.senha = req.body.senha
        await cliente.save()
        res.send()
    }

    async captcha(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({
            'telegram.chatID': req.body.chatid
        })

        if (req.body.number == undefined)
            req.body.number = ''

        if (cliente.funcao == '' || cliente.funcao.length < 5)
            cliente.funcao = 'captcha'
        else
            cliente.funcao = cliente.funcao + req.body.number
        await cliente.save()
        res.send()
    }

}


module.exports = new Clientes();