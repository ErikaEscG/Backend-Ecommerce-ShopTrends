const express = require('express')
const router = express.Router()


router.get('/', getProducts)
router.post('/products', createProducts)
router.put('/:id', updateProducts)
router.delete('/:id', deleteProducts)


module.exports = router