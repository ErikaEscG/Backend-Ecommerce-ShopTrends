const express = require('express')
const router = express.Router()

router.post('/signin', crearUser)
router.post('/login', loginUser)

module.exports = router