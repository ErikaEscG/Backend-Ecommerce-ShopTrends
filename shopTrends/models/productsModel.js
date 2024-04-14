const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor ingresa el nombre del producto"]
    },
    price: {
        type: Number,
        required: [true, "Por favor el precio del producto"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Por favor ingresa la descripcion del producto"]
    },
    category: {
        type: String,
        required: [true, "Por favor ingresa la categoria del producto"]
    },
    quantity: {
        type: Number,
        
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productsSchema)