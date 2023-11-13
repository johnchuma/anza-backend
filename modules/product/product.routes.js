const {Router} = require('express')
const { createProduct, updateProduct, getProducts } = require('./product.controller')

const router = Router()
router.post("/:uuid",createProduct)
router.patch("/:uuid",updateProduct)
router.get("/",getProducts)

module.exports = router