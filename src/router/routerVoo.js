const voo = require('../controller/controllerVoo')
const express = require('express')
const router = express.Router()

router.post('/savevoo', voo.savevoo)
router.get('/getvoo', voo.getvoo)
router.put('/editvoo/:id', voo.editvoo)
router.delete('/deletevoo/:id', voo.deletevoo)

module.exports = router;