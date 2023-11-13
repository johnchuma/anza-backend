const {Router} = require('express')
const { createProduct, updateProduct, getProduct, getProducts, getFeaturedProducts } = require('./product.controller')

const router = Router()
router.post("/:uuid",createProduct)
router.patch("/:uuid",updateProduct)
router.get("/business/:uuid",getProducts)
router.get("/featured",getFeaturedProducts)
router.get("/",getProducts)

module.exports = router