const {Router} = require('express')
const { /*createPromotion,*/ broadcastPromotion} = require('./promotion.controller')

const router = Router()
// router.post("/:uuid",createPromotion)
router.get("/:role",broadcastPromotion)
module.exports = router