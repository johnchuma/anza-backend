const { errorResponse, successResponse } = require("../../utils/responses")
const {Product,Business,Pledge,ProductImage,BusinessSector,Review} = require("../../models");
const getUrl = require("../../utils/cloudinary_upload");


const createProduct = async(req,res)=>{
    try {
    
        const {
            name,oldPrice,newPrice,amount,description,isFeatured
        } = req.body;
        const uuid = req.params.uuid
        const business = await Business.findOne({
            where:{
                uuid
            }
        });
        const response = await Product.create({
            name,oldPrice,newPrice,amount,isFeatured,description,businessId:business.id
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const updateProduct = async(req,res)=>{
    try {
       
        const uuid = req.params.uuid
        const product = await Product.findOne({
            where:{
                uuid
            }
        });
        const response = await product.update({...req.body})
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
    }
    
const getProducts = async(req,res)=>{
    try {
    
        const response = await Product.findAll({
           
            include:[ProductImage]
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
const getProduct = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const product = await Product.findOne({
            where:{
                uuid
            },
            include:[ProductImage,{
                model: Review,
            }],
        });
        successResponse(res,product)
    } catch (error) {
        errorResponse(res,error)
    }
}
const BusinessProductCount = async(req,res)=>{
    try {
         const uuid = req.params.uuid
         const Business = await Business.findOne({
            where:{
                uuid
            }
         })
         const count = await Product.count({
            where:{
                BusinessId:Business.id
            }
         })
         successResponse(res,count)
    } catch (error) {
        errorResponse(res,error)
    }
}
const deleteProducts = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const event = await Product.findOne({
            where:{
                uuid
            }
        });
        const response = await event.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getFeaturedProducts = async(req,res)=>{
    try {
        const product = await Product.findAll({
            where:{
                isFeatured:true
            }
        });
        successResponse(res,product)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getBusinessSectorProducts = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const businessSector = await BusinessSector.findOne({
            where: {
                uuid
            }
        })

        const response = await Product.findAll({
            include: [{
                model: Business,
                where: {
                    businessSectorId: businessSector.id
                }
            }]
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

module.exports = {
    createProduct,updateProduct,getProduct,getProducts,getFeaturedProducts,getBusinessSectorProducts
}