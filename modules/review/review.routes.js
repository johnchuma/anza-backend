const {Router} = require('express')
const { createReview, updateReview, getReviews, getReview } = require('./review.controller')

const router = Router()
router.post("/",createReview)
router.patch("/:uuid",updateReview)
router.get("/:uuid",getReview)
router.get("/",getReviews)

module.exports = router