const {Router} = require('express')
const { createOrder, deleteOrderProduct, deleteOrder, getSpecificBusinessOrders, getCustomerOrders,updateOrderProduct } = require('./order.controller')

const router = Router()
router.post("/:uuid",createOrder)
router.get("/business/:uuid",getSpecificBusinessOrders)
router.get("/user/:uuid",getCustomerOrders)
router.delete('/orderProduct/:uuid',deleteOrderProduct)
router.delete('/:uuid',deleteOrder)
router.patch("/:uuid",updateOrderProduct)

module.exports = router