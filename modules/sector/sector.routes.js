const {Router} = require('express')
const { createBusinessSector, getBusinessSector, getAllBusinessSector, getBusinessSectorProducts } = require('./sector.controller')

const router = Router()
router.post("/",createBusinessSector) 
router.get("/:uuid",getBusinessSector) 
router.get("/",getAllBusinessSector) 
router.get("/business/products/:uuid",getBusinessSectorProducts) 

module.exports = router