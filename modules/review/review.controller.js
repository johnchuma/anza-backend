const { errorResponse, successResponse } = require("../../utils/responses")
const {Review, Product, User} = require("../../models");


const createReview = async(req,res)=>{
    try {
      
        const {
            rate,comment,name,email,userId,productId
        } = req.body;
        const product = await Product.findOne({
            where:{
                uuid:productId
            }
        });
        if (userId != null) {
            const user = await User.findOne({
                where:{
                    uuid:userId
                }
            });   
            userId = user.id         
        }
        const response = await Review.create({
            rate,comment,name,email,userId,productId:product.id
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
    
const updateReview = async(req,res)=>{
    try {
        
        const uuid = req.params.uuid
        const review = await Review.findOne({
            where:{
                uuid
            }
        });
        const response = await review.update({...req.body})
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
        
const getReviews = async(req,res)=>{
    try {
        const response = await Review.findAll({
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getReview = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const review = await Review.findOne({
            where:{
                uuid
            }
        });
        successResponse(res,review)
    } catch (error) {
        errorResponse(res,error)
    }
}

module.exports = {createReview, updateReview, getReviews, getReview}