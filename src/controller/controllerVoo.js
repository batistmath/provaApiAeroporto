const Voo = require('../model/modelVoo')
const portaoEmbarque = require('../model/modelPortaoEmbarque')
const express = require('express')

const controller = express()
controller.use(express.json())

    exports.getvoo = async (req,res) => {
        const voos = await Voo.find()
        return res.send(voos)
    }
    exports.savevoo = async (req,res) => {
        const voos = new Voo({
            numeroVoo: req.body.numeroVoo,
            origem: req.body.origem,
            destino: req.body.destino,
            dataHoraPartida: req.body.dataHoraPartida,
            portaoId: req.body.portaoId,
            status: req.body.status
        })
        await voos.save()
        return res.send(voos)
    }
    exports.addportaovoo = async (req,res) => {
        const {idVoo, idPortao} = req.params
        const voos = await Voo.findByIdAndUpdate(idVoo, {
            portaoId: req.body.portaoId
        }, {
            new:true
        })
        await portaoEmbarque.findByIdAndUpdate(idPortao, {
            disponivel: false
        }, {
            new: true
        })
        return res.send(voos)
    }
    exports.vooconcluido = async (req,res) => {
        const {idVoo, idPortao} = req.params
        const voos = await Voo.findByIdAndUpdate(idVoo, {
            status: req.body.status
        }, {
            new: true
        })
        await portaoEmbarque.findByIdAndUpdate(idPortao, {
            disponivel: true
        })
        return res.send(voos)
    }
    exports.editvoo = async (req,res) => {
        const voos = await Voo.findByIdAndUpdate(req.params.id, {
            numeroVoo: req.body.numeroVoo,
            origem: req.body.origem,
            destino: req.body.destino,
            dataHoraPartida: req.body.dataHoraPartida,
            portaoId: req.body.portaoId,
            status: req.body.status
        }, {
            new:true
        })
        return res.send(voos)
    }
    exports.deletevoo = async (req,res) => {
        const voos = await Voo.findByIdAndDelete(req.params.id)
        return res.send(voos)
    }