const {Router} = require('express')
const { createFavourite, updateFavourite, getFavourites, getFavourite } = require('./favourite.controller')

const router = Router()
router.post("/",createFavourite)
router.patch("/:uuid",updateFavourite)
router.get("/:uuid",getFavourite)
router.get("/",getFavourites)

module.exports = router