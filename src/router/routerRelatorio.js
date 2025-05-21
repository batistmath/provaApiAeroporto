const relatorioController = require('../controller/controllerRelatorio')
const express = require('express')
const router = express.Router()

router.get('/getrelatorio', relatorioController.getRelatorioVoosHoje);

module.exports = router;