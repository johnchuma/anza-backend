const {Router} = require('express')
const { createProduct, updateProduct, getProduct, getProducts, getFeaturedProducts, getBusinessSectorProducts } = require('./product.controller')

const router = Router()
router.post("/:uuid",createProduct)
router.get("/:uuid",getProduct)
router.patch("/:uuid",updateProduct)
router.get("/business/:uuid",getProducts)
router.get("/featured",getFeaturedProducts)
router.get("/",getProducts)
router.get('/business_sector/:uuid',getBusinessSectorProducts)

module.exports = router