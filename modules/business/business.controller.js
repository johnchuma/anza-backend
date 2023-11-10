const { errorResponse, successResponse } = require("../../utils/responses")
const {Business,User} = require("../../models");

const createBusiness = async(req,res)=>{
try {
    const {
        name,
        region,
        sector,
        description
    } = req.body;
    const uuid = req.params.uuid
    const user = await User.findOne({
        where:{
            uuid
        }
    })
    const response = await Business.create({
        name,
        region,
        businessSector:sector,
        description,
        userId:user.id
    })
    successResponse(res,response)
} catch (error) {
    errorResponse(res,error)
}
}

const getUserBusiness = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const user = await User.findOne({
            where:{
                uuid
            }
        });
        const response = await Business.findOne({
            where:{
                userId:user.id
            }
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
    }
    const updateBusiness = async(req,res)=>{
        try {
            const uuid = req.params.uuid
            const Business = await Business.findOne({
                where:{
                    uuid
                }
            });
            const response = await Business.update(req.body)
            successResponse(res,response)
        } catch (error) {
            errorResponse(res,error)
        }
        }

    const deleteBusiness = async(req,res)=>{
        try {
            let {
                name
            } = req.body;
            const uuid = req.params.uuid
            const Business = await Business.findOne({
                where:{
                    uuid
                }
            });
            const response = await Business.destroy()
            successResponse(res,response)
        } catch (error) {
            errorResponse(res,error)
        }
        }
    
const getCategories = async(req,res)=>{
    try {
        const response = await Business.findAll()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

module.exports = {
    createBusiness,updateBusiness,getCategories,deleteBusiness,getUserBusiness
}