const Funcionario = require('../model/modelFuncionario')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const validatorFuncionario = require('../validator/validatorFuncionario')
const bcrypt = require('bcrypt')
const express = require('express')

const controller = express()
controller.use(express.json())

  exports.getfuncionario = async (req,res) => { 
        const funcionarios = await Funcionario.find()
        return res.send(funcionarios)
    },
    exports.savefuncionario = async (req,res) => {
        const emailexiste = await validatorFuncionario.emailexiste(req.body.email);
        if (emailexiste) {
            return res.status(400).send({ erro: 'Email já cadastrado.' });
        }
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(req.body.senha, salt);
        const funcionarios = new Funcionario({
            nome: req.body.nome,
            email: req.body.email,
            senha: senhaCriptografada,
            cargo: req.body.cargo
        })
        await funcionarios.save()
        return res.send(funcionarios)
    },
    exports.loginfuncionario = async (req,res) => {
        const emailexiste = await validatorFuncionario.emailexiste(req.body.email);
        if (!emailexiste) {
            return res.status(401).send({ erro: 'Usuario não encontrado.' });
        }
        const senhavalida = await validatorFuncionario.senhacorreta(req.body.email, req.body.senha)
        if (!senhavalida) {
            return res.status(401).send({ erro: 'Credenciais incorretas.' });
        }
        const funcionario = await Funcionario.findOne({email: req.body.email});
        const token = jwt.sign(
            {
                sub: funcionario._id,
                email: funcionario.email,
                cargo: funcionario.cargo
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.send({
            mensagem: 'Login bem-sucedido!',
            token,
        });
        

    }