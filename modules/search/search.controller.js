const { errorResponse, successResponse } = require("../../utils/responses")
const {Product,Business,Pledge,ProductImage} = require("../../models");
// import { Op } from '@sequelize/core';
const {Op} = require('sequelize');

const searchProduct = async(req, res) => {
    try {
        const {itemName} = req.params
        const results = await Product.findAll({
            where:{
                name: { [Op.like]: "%"+itemName+"%" },
            }
        })
        successResponse(res, results)
    } catch (error) {
        errorResponse(res, error)
    }
}
const getSearchedProduct = async(req, res) => {
    try {
        const {uuid} = req.body
        const result = await Product.findOne({
            where:{
                uuid,
            }
        })
        successResponse(res, result)
    } catch (error) {
        errorResponse(res, error)
    }
}

module.exports = {searchProduct,getSearchedProduct}