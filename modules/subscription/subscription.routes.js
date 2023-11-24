const {Router} = require('express')
const { validateJWT } = require("../../utils/validateJWT")
const { createSubscription, getSubscription, getAllSubscriptions, deleteSector } = require('./subscription.controller')

const router = Router()
router.post("/",createSubscription) 
router.get("/:uuid",getSubscription) 
router.get("/",getAllSubscriptions)
router.delete('/:uuid',validateJWT,deleteSector)

module.exports = router