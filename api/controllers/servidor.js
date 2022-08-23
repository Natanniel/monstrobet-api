
class Servidor {

    async criarNovo(req, res) {
        let Servidor = require('../models/servidor')
        let servidor = new Servidor({
            nome: 'Novo servidor',
            ping: new Date(),
            clientes : []
        })
        await servidor.save()
        res.send({mensagem:'Servidor criado com sucesso !'})
    }

    async seleciona(req,res){
        let Servidor = require('../models/servidor')
        let servidor = await Servidor.findOne({ _id: req.query.id })       
        res.send(servidor)
    }

    async metabatida(req,res){
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({ _id: req.body.idcliente }) 
        cliente.operacao.status = 0
        cliente.operacao.meta = 0.01
        await cliente.save()      
        res.send()
    }


    async cancelaIniciar(req,res){
        let Clientes = require('../models/clientes')
        let cliente = await Clientes.findOne({ _id: req.body.idcliente }) 
        cliente.operacao.status = 0
        await cliente.save()      
        res.send()
    }

    async iniciarCliente(req,res){
       
        let Clientes = require('../models/clientes')
        let Servidor = require('../models/servidor')

        let cliente = await Clientes.findOne({ _id: req.body.idcliente })
        cliente.operacao.status = 2

        let servidor = await Servidor.findOne({_id :req.body.idservidor })
        servidor.clientes.push({ id:  req.body.idcliente })
        await servidor.save()
        await cliente.save() 
        res.send()
    }

}


module.exports = new Servidor();