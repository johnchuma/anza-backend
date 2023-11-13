const {Router} = require('express')
const { createProduct, updateProduct, getProducts, getFeaturedProducts } = require('./product.controller')

const router = Router()
router.post("/:uuid",createProduct)
router.patch("/:uuid",updateProduct)
<<<<<<< HEAD
router.get("/business/:uuid",getProducts)
router.get("/featured",getFeaturedProducts)
=======
router.get("/",getProducts)
>>>>>>> 21d4326963740517b01983806b64a12d374b5074

module.exports = router