const { errorResponse, successResponse } = require("../../utils/responses")
const {Subscription, Business, Product} = require("../../models");


const createSubscription = async(req,res)=>{
    try {
        const {email,user_uuid} = req.body
        const subscription = Subscription.findOne({
            where:{
                email:email
            }
        })
        if (!subscription) {
            if (user_uuid) {
                const user = await User.findOne({
                    where:{
                        email:email
                    }
                })
                const response = await Subscription.create({
                    email,
                    userId:user.id
                })
                successResponse(res,response)
            }else{
                const response = await Subscription.create({
                    email
                })
                successResponse(res,response)
            }            
        }else{
            errorResponse(res,{message:'Subscription already added!'})
        }

    } catch (error) {
        errorResponse(res,error)
    }
}

const getAllSubscriptions = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const response = await Subscription.findAll({
            attributes:{
                // exclude:["id"/*,"uuid","name","createdAt","updatedAt"*/]
            },
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getSubscription = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const response = await Subscription.findOne({
            where:{
                uuid
            },
            attributes:{
                exclude:["id"/*,"uuid","name","createdAt","updatedAt"*/]
            },
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteSubscription = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const sector = await Subscription.findOne({
            where:{
                uuid
            }
        });
        const response = await sector.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

module.exports = {createSubscription, getSubscription, getAllSubscriptions, deleteSubscription}