const PortaoEmbarque = require('../model/modelPortaoEmbarque')
const validarVoo = require('../validator/validatorPortao')
const express = require('express')

const controller = express()
controller.use(express.json())

    exports.getportao = async (req,res) => {
        const portoes = await PortaoEmbarque.find()
        return res.send(portoes)
    },
    exports.saveportao = async (req,res) => {

        const PortaoemUso = await validarVoo.portaoUso(req.body.codigo);
        if (PortaoemUso) {
          return res.status(400).send({ erro: 'Este portão já está vinculado a um voo.' });
        }

        const portoes = new PortaoEmbarque({
            codigo: req.body.codigo,
            disponivel: req.body.disponivel
        })
        await portoes.save()
        return res.send(portoes)
    },
    exports.editportao = async (req,res) => {
        const portoes = await PortaoEmbarque.findByIdAndUpdate(req.params.id, {
            codigo: req.body.codigo,
            disponivel: req.body.disponivel
        }, {
            new:true
        })
        return res.send(portoes)
    },
    exports.deleteportao = async (req,res) => {
        const portoes = await PortaoEmbarque.findByIdAndDelete(req.params.id)
        return res.send(portoes)
    }