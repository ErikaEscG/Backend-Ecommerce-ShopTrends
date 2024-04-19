const express = require('express')
const router = express.Router()
const { createUser, loginUser } = require('../controllers/usersControllers')

router.post('/signin', createUser)
router.post('/login', loginUser)

module.exports = router