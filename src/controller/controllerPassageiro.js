const Passageiro = require('../model/modelPassageiro')
const validatorPass = require('../validator/validatorPassageiro')
const express = require('express')

const controller = express()
controller.use(express.json())

    exports.getpassageiro = async (req,res) => {
        const passageiros = await Passageiro.find()
        return res.send(passageiros)
    },
    exports.savepassageiro = async (req,res) => {
        const existe = await validatorPass.cpfExiste(req.body.cpf);
        if (existe) {
          return res.status(400).send({ erro: 'CPF já cadastrado.' });
        }
        const voo = await validatorPass.vooStatus(req.body.vooId);
        if (voo){
            return res.status(400).send({ erro: 'So e permitido o check-in se o voo estiver como embarque' });
        }
        const passageiros = new Passageiro({
            nome: req.body.nome,
            cpf: req.body.cpf,
            vooId: req.body.vooId,
            statusCheckin: req.body.statusCheckin
        })
        await passageiros.save()
        return res.send(passageiros)
    },
    exports.editpassageiro = async (req,res) => {
        const passageiros = await Passageiro.findByIdAndUpdate(req.params.id, {
            nome: req.body.nome,
            cpf: req.body.cpf,
            vooId: req.body.vooId,
            statusCheckin: req.body.statusCheckin
        }, {
            new:true
        })
        return res.send(passageiros)
    },
    exports.deletepassageiro = async (req,res) => {
        const passageiros = await Passageiro.findByIdAndDelete(req.params.id)
        return res.send(passageiros)
    }