const {Router} = require('express')
const { createProductImage, deleteProductImage } = require('./product_image.controller');
const upload = require('../../utils/upload');

const router = Router()
router.post("/:uuid",upload.single("file"),createProductImage)
router.delete('/:uuid',deleteProductImage)
module.exports = router