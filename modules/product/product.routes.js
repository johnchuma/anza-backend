const { validateJWT } = require("../../utils/validateJWT")
const {Router} = require('express')
const { createProduct, updateProduct, getProduct, getProducts, getFeaturedProducts, getBusinessSectorProducts, getTopRatedProducts, getTopSellingProducts, 
    searchProduct,getSearchedProduct, deleteProduct, BusinessProducts } = require('./product.controller')

const router = Router()
router.post("/:uuid",validateJWT,createProduct)
router.get("/featured",validateJWT,getFeaturedProducts)
router.get("/top_selling",validateJWT,getTopSellingProducts)
router.get("/top_rated",validateJWT,getTopRatedProducts)
router.get("/:uuid",validateJWT,getProduct)
router.patch("/:uuid",validateJWT,updateProduct)
router.get("/business/:uuid",validateJWT,BusinessProducts)
router.get("/",getProducts)
router.get('/business_sector/:uuid',validateJWT,getBusinessSectorProducts)
router.delete('/:uuid',validateJWT,deleteProduct)

router.get("/search/:itemName",searchProduct) //PASS PRODUCT NAME ON URL
router.post("/search/",getSearchedProduct) //PASS PRODUCT UUID IN REQUEST BODY

module.exports = router