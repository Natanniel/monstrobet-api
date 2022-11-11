
class Servidor {

    async enviaSinal(req, res) {
        let Sinal = require('../models/sinal')

        let sinal = await Sinal.findOne({ referencia: 'rzblaze' })
        if (sinal) {
            sinal.cor = req.body.cor
            sinal.numero = sinal.numero + 1
            await sinal.save()
        }
        else { 
            sinal = new Sinal({
                cor : req.body.cor,
                numero : 1,
                referencia : 'rzblaze'
            })

            await sinal.save()
        }

        res.send()
    }

    async coletaSinal(req, res){
        let Sinal = require('../models/sinal')
        let sinal = await Sinal.findOne({ referencia: 'rzblaze' })
        res.send(sinal)
    }

















    async criarNovo(req, res) {
        let Servidor = require('../models/servidor')
        let servidor = new Servidor({
            nome: 'Novo servidor',
            ping: new Date(),
            clientes: []
        })
        await servidor.save()
        res.send({ mensagem: 'Servidor criado com sucesso !' })
    }

    async seleciona(req, res) {
        let Servidor = require('../models/servidor')
        let servidor = await Servidor.findOne({ _id: req.query.id })
        res.send(servidor)
    }

    async kiwify(req, res) {
        console.log(req.body)
        if (req.body.order_status == 'paid') {
            let Clientes = require('../models/clientes')
            let cliente = await Clientes.findOne({ email: req.body.Customer.email })


        }



        res.send()
    }

    async metabatida(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({ _id: req.body.idcliente })
        cliente.operacao.status = 0
        cliente.operacao.meta = 0.01
        await cliente.save()
        res.send()
    }


    async cancelaIniciar(req, res) {
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({ _id: req.body.idcliente })
        cliente.operacao.status = 0
        await cliente.save()
        res.send()
    }

    async iniciarCliente(req, res) {

        let Clientes = require('../models/clientes')
        let Servidor = require('../models/servidor')

        let cliente = await Clientes.findOne({ _id: req.body.idcliente })
        cliente.operacao.status = 2

        let servidor = await Servidor.findOne({ _id: req.body.idservidor })
        servidor.clientes.push({ id: req.body.idcliente })
        await servidor.save()
        await cliente.save()

        res.send()
    }

}


module.exports = new Servidor();