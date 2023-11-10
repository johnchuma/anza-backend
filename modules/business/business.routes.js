const {Router} = require('express')
const { createBusiness, getCategories, updateBusiness, deleteBusiness, getUserBusiness } = require('./business.controller');

const router = Router()
router.post("/:uuid",createBusiness)
router.get('/user/:uuid',getUserBusiness)
router.patch('/:uuid',updateBusiness)
router.delete('/:uuid',deleteBusiness)

module.exports = router