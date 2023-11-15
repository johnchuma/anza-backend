const {Router} = require('express')
const { createBusiness, getCategories, updateBusiness, deleteBusiness, getUserBusiness, getAllBusiness, getSellersApplications } = require('./business.controller');

const router = Router()
router.post("/:uuid",createBusiness)
router.get('/user/:uuid',getUserBusiness)
router.get('/',getAllBusiness)
router.get('/applications',getSellersApplications)
router.patch('/:uuid',updateBusiness)
router.delete('/:uuid',deleteBusiness)

module.exports = router