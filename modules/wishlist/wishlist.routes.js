const {Router} = require('express')
const { createWishlist, deleteWishlist, isInWishlist, myWishlist } = require('./wishlist.controller')

const router = Router()
router.post("/:uuid",createWishlist)
router.delete('/:uuid',deleteWishlist)
router.post('/product/:uuid',isInWishlist)//pass product uuid
router.get('/:uuid',myWishlist)//pass user uuid

module.exports = router