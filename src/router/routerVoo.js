const voo = require('../controller/controllerVoo')
const auth = require('../middlewares/authMiddleware')
const express = require('express')
const router = express.Router()

router.post('/savevoo', auth, voo.savevoo)
router.get('/getvoo', voo.getvoo)
router.put('/editvoo/:id', auth, voo.editvoo)
router.delete('/deletevoo/:id', voo.deletevoo)
router.put('/vooconcluido/:idVoo/:idPortao', voo.vooconcluido)
router.put('/addportao/:idVoo/:idPortao', voo.addportaovoo)

module.exports = router;