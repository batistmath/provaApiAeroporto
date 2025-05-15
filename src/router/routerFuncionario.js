const funcionario = require('../controller/controllerFuncionario')
const express = require('express')
const router = express.Router()

router.post('/savefuncionario', funcionario.savefuncionario)
router.get('/getfuncionario', funcionario.getfuncionario)
router.post('/login', funcionario.loginfuncionario)

module.exports = router;