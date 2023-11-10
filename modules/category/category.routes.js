const {Router} = require('express')
const { createCategory, getCategories, updateCategory, deleteCategory } = require('./category.controller');

const router = Router()
router.post("/:uuid",createCategory)
router.get('/business/:uuid',getCategories)
router.patch('/:uuid',updateCategory)
router.delete('/:uuid',deleteCategory)

module.exports = router