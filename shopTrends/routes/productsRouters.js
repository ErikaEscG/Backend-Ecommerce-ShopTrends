const express = require('express')
const router = express.Router()
const { createProducts, getProducts, updateProducts, deleteProducts } = require("../controllers/productsControllers")


router.get('/:name', getProducts)
router.post('/', createProducts)
router.put('/:id', updateProducts)
router.delete('/:id', deleteProducts)


module.exports = router