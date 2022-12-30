
class Joker {

    async apostar(req, res) {

        let Joker = require('../models/joker')
        let joker = await Joker.findOne({ status: true })

        if (req.body.valorCopas > 0 && req.body.valorOuros > 0 && req.body.valorEspadas > 0 && req.body.valorPaus) {
            res.status(500).send({ message: "Voce so pode apostar no maximo em 3 nipes ao mesmo tempo." })

        } else

            //console.log(joker)
            if (joker) {

                if (joker.status == true) {
                    joker.apostas.push({
                        usuario: req.id,
                        copas: req.body.valorCopas,
                        ouros: req.body.valorOuros,
                        espadas: req.body.valorEspadas,
                        paus: req.body.valorPaus
                    })

                    await joker.save()

                    let Cliente = require('../models/clientes')
                    let cliente = await Cliente.findOne({ _id: req.id })
                    console.log(cliente.saldo)
                    cliente.saldo = cliente.saldo - (parseInt(req.body.valorCopas) + parseInt(req.body.valorOuros) + parseInt(req.body.valorEspadas) + parseInt(req.body.valorPaus))
                    console.log(cliente.saldo)
                    await cliente.save()

                    res.send()
                } else
                    res.status(500).send({ message: "Apostas encerradas" })
            } else {
                joker = new Joker()
                await joker.save()
                res.status(500).send({ message: "Nenhuma aposta disponivel no momento" })
            }

    }

    async abrirApostas(req, res) {
        let Joker = require('../models/joker')
        let joker = await Joker.findOne({ status: true })
        if (!joker) {
            joker = new Joker()
            await joker.save()
        }

        res.send()
    }

    async obterApostas(req, res) {
        let Joker = require('../models/joker')
        let joker = await Joker.findOne()
        joker.status = false;

        let apostas = [];
        let total = 0

        // Coleta total em copas
        for (let i = 0; i < joker.apostas.length; i++) {
            total += joker.apostas[i].copas
        }

        apostas.push({
            nome: "Copas",
            total: total
        })
        total = 0

        // Coleta total em Ouros
        for (let i = 0; i < joker.apostas.length; i++) {
            total += joker.apostas[i].ouros
        }

        apostas.push({
            nome: "Ouros",
            total: total
        })
        total = 0


        // Coleta total em espadas
        for (let i = 0; i < joker.apostas.length; i++) {
            total += joker.apostas[i].espadas
        }

        apostas.push({
            nome: "Espadas",
            total: total
        })
        total = 0

        // Coleta total em copas
        for (let i = 0; i < joker.apostas.length; i++) {
            total += joker.apostas[i].paus
        }

        apostas.push({
            nome: "Paus",
            total: total
        })
        total = 0

        res.send(apostas)



    }

    async calculaGanhadores(req, res) {
        console.log(req.body)
        let resultado = req.body

        let Clientes = require('../models/clientes')
        let Joker = require('../models/joker')
        let joker = await Joker.findOne({ status: true })
        let lucroTotalJogadores = 0
        let totalApostado = 0
        let teveJackpot = false

        let Banca = require("../models/banca")
        let banca = await Banca.findOne()

        // Vitoriosos 
        for (let i = 0; i < joker.apostas.length; i++) {
            let lucro = 0

            // Primeiro resultado 
            if (resultado[0] == "Copas")
                if (joker.apostas[i].copas > 0)
                    lucro += joker.apostas[i].copas * 3

            if (resultado[0] == "Ouros")
                if (joker.apostas[i].ouros > 0)
                    lucro += joker.apostas[i].copas * 3

            if (resultado[0] == "Espadas")
                if (joker.apostas[i].espadas > 0)
                    lucro += joker.apostas[i].espadas * 3

            if (resultado[0] == "Paus")
                if (joker.apostas[i].paus > 0)
                    lucro += joker.apostas[i].paus * 3

            // Segundo resultado 
            if (resultado[1] == "Copas")
                if (joker.apostas[i].copas > 0)
                    lucro += joker.apostas[i].copas * 1.5

            if (resultado[1] == "Ouros")
                if (joker.apostas[i].ouros > 0)
                    lucro += joker.apostas[i].copas * 1.5

            if (resultado[1] == "Espadas")
                if (joker.apostas[i].espadas > 0)
                    lucro += joker.apostas[i].espadas * 1.5

            if (resultado[1] == "Paus")
                if (joker.apostas[i].paus > 0)
                    lucro += joker.apostas[i].paus * 1.5


            // Segundo resultado 
            if (resultado[2] == "Copas")
                if (joker.apostas[i].copas > 0)
                    lucro += joker.apostas[i].copas * 1.5

            if (resultado[2] == "Ouros")
                if (joker.apostas[i].ouros > 0)
                    lucro += joker.apostas[i].copas * 1.5

            if (resultado[2] == "Espadas")
                if (joker.apostas[i].espadas > 0)
                    lucro += joker.apostas[i].espadas * 1.5

            if (resultado[2] == "Paus")
                if (joker.apostas[i].paus > 0)
                    lucro += joker.apostas[i].paus * 1.5

            if (resultado[0] == "Jackpot" || resultado[1] == "Jackpot" || resultado[2] == "Jackpot") {
                lucro += (banca.jackpotJoker / joker.apostas.length)
                teveJackpot = true
            }

            let cliente = await Clientes.findOne({ _id: joker.apostas[i].usuario })
            cliente.saldo = cliente.saldo + lucro
            await cliente.save()
            lucroTotalJogadores += lucro
        }

        // Coleta o total apostado 
        for (let i = 0; i < joker.apostas.length; i++) {
            totalApostado += (joker.apostas[i].copas + joker.apostas[i].ouros + joker.apostas[i].espadas + joker.apostas[i].paus)
        }

        console.log("Total apostado R$ " + totalApostado + " total ganho pelos jogadores R$ " + lucroTotalJogadores)

        if (!banca) {
            banca = new Banca()
            await banca.save()
            banca = await Banca.findOne()
        }

        let casaLucro = totalApostado - lucroTotalJogadores
        if (casaLucro >= 0) {
            // Casa teve lucro
            banca.casa += casaLucro / 3
            banca.lucro += casaLucro / 3     
            banca.jackpotJoker += casaLucro / 3
        } else {
            // Casa teve prejuizo
            banca.casa -= Math.abs(casaLucro)
        }
        
        if(teveJackpot)
            banca.jackpotJoker = 0

        joker.status = false
        await joker.save()
        await banca.save()
        res.send({ jackpot: banca.jackpotJoker })
    }


}

module.exports = new Joker();