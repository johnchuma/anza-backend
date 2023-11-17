const {Router} = require('express')
const { validateJWT } = require("../../utils/validateJWT")
const { createBusinessSector, getBusinessSector, getAllBusinessSector, getBusinessSectorProducts, deleteSector } = require('./sector.controller')

const router = Router()
router.post("/",validateJWT,createBusinessSector) 
router.get("/:uuid",validateJWT,getBusinessSector) 
router.get("/",validateJWT,getAllBusinessSector)
router.get("/business/products/:uuid",validateJWT,getBusinessSectorProducts)
router.delete('/:uuid',validateJWT,deleteSector)

module.exports = router