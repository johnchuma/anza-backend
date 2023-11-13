const {Router} = require('express')
const { searchProduct, getSearchedProduct } = require('./search.controller')

const router = Router()
router.get("/:itemName",searchProduct) //PASS PRODUCT NAME ON URL
router.get("/",getSearchedProduct) //PASS PRODUCT UUID IN REQUEST BODY

module.exports = router