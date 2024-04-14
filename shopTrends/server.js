const express = require('express')

const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000

connectDB()

const app = express()


app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))