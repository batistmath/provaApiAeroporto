const voo = require('../controller/controllerVoo')
const express = require('express')
const router = express.Router()

router.post('/savevoo', voo.savevoo)
router.get('/getvoo', voo.getvoo)
router.put('/editvoo/:id', voo.editvoo)
router.delete('/deletevoo/:id', voo.deletevoo)
router.put('/vooconcluido/:idVoo/:idPortao', voo.vooconcluido)
router.put('/addportao/:idVoo/:idPortao', voo.addportaovoo)

module.exports = router;