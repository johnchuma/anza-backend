const {Router} = require('express')
const { validateJWT } = require("../../utils/validateJWT")
const { createReview, updateReview, getReviews, getReview } = require('./review.controller')

const router = Router()
router.post("/",validateJWT,createReview)
router.patch("/:uuid",validateJWT,updateReview)
router.get("/:uuid",validateJWT,getReview)
router.get("/",validateJWT,getReviews)

module.exports = router