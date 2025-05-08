const passageiro = require('../controller/controllerPassageiro')
const express = require('express')
const router = express.Router()

router.post('/savepassageiro', passageiro.savepassageiro)
router.get('/getpassageiro', passageiro.getpassageiro)
router.put('/editpassageiro/:id', passageiro.editpassageiro)
router.delete('/deletepassageiro/:id', passageiro.deletepassageiro)

module.exports = router;