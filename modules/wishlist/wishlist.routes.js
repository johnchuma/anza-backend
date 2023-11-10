const {Router} = require('express')
const { createWishlist, deleteWishlist } = require('./wishlist.controller')

const router = Router()
router.post("/:uuid",createWishlist)
router.delete('/:uuid',deleteWishlist)

module.exports = router