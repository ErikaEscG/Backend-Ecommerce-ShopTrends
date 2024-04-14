const asyncHandler = require('express-async-handler')
const Product = require('../models/productsModel')

const getProducts = asyncHandler(async (req, res) => {
    const productName = req.params.name;
    console.log('Television');
    
    const product = await Product.findOne({ name: productName })
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product)

})

const createProducts = asyncHandler(async (req, res) => {

    if (!req.body.name) {
        res.status(400)
        throw new Error('Por favor ingresa el nombre del producto')
    }

    if (!req.body.price) {
        res.status(400)
        throw new Error('Por favor ingresa el precio del producto')
    }

    if (!req.body.description) {
        res.status(400)
        throw new Error('Por favor ingresa la descripcion del producto')
    }

    if (!req.body.category) {
        res.status(400)
        throw new Error('Por favor ingresa la categoria del producto')
    }

    const products = await Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category
    })

    res.status(201).json(products)
})


const updateProducts = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('Ese producto no existe')
    }

     else {
        const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json(productUpdated)
    }
})

const deleteProducts = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('Ese producto no existe')
    }

     else {
        await Product.deleteOne(product)
        res.status(200).json({ id: req.params.id })
    }
})


module.exports = {
    createProducts,
    getProducts,
    updateProducts,
    deleteProducts
}