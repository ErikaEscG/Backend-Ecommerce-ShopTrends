const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const createUser = asyncHandler(async (req, res) => {

    
    const { name, email, password } = req.body

    
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('Ese usuario ya existe en la base de datos')
    }

    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Error al crear el usuario')
    }

    
})


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    
    const user = await User.findOne({ email })

    
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }

})

const generateToken = (id_usuario) => {
    return jwt.sign({ id_usuario }, process.env.JWT_SECRET, {
        expiresIn: '30m'
    })
}

  
module.exports = {
    createUser,
    loginUser,
    
}