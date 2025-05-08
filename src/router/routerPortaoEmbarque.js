const portao = require('../controller/controllerPortaoEmbarque')
const express = require('express')
const router = express.Router()

router.post('/saveportao', portao.saveportao)
router.get('/getportao', portao.getportao)
router.put('/editportao/:id', portao.editportao)
router.delete('/deleteportao/:id', portao.deleteportao)

module.exports = router;