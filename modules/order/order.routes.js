const {Router} = require('express')
const { validateJWT } = require("../../utils/validateJWT")
const { createOrder, deleteOrderProduct, deleteOrder, getSpecificBusinessOrders, getCustomerOrders,updateOrderProduct } = require('./order.controller')

const router = Router()
router.post("/:uuid",validateJWT,createOrder)
router.get("/business/:uuid",validateJWT,getSpecificBusinessOrders)
router.get("/user/:uuid",validateJWT,getCustomerOrders)
router.delete('/orderProduct/:uuid',validateJWT,deleteOrderProduct)
router.delete('/:uuid',validateJWT,deleteOrder)
router.patch("/:uuid",validateJWT,updateOrderProduct)

module.exports = router