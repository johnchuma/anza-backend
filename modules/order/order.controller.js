const { errorResponse, successResponse } = require("../../utils/responses")
const {BusinessCategory,Business,User,Order,OrderProduct,Product,ProductImage} = require("../../models");



const createOrder = async(req,res)=>{
    try {
        const {
            products
        } = req.body;
        const uuid = req.params.uuid;
        const user = await User.findOne({
            uuid
        })
        const order = await Order.create({
            userId:user.id
        })
    
        for (let index = 0; index < products.length; index++) {
            const item = products[index];
            await OrderProduct.create({
                orderId:order.id,
                productId:item.id,
                quantity:item.quantity
            })
        }
    
        successResponse(res,order)
    } catch (error) {
        errorResponse(res,error)
    }
}


const getCustomerOrders = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const user = await User.findOne({
            where:{
                uuid
            }
        });
        const response = await Order.findAll({
            order:[['createdAt', 'DESC']],
            where:{
                userId:user.id,
            },
            include:[{
                model:OrderProduct,
                include:[{
                    model:Product,
                    include:[ProductImage]
                }]
            }]
        });
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getSpecificBusinessOrders = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const business = await Business.findOne({
            where:{
                uuid
            }
        });
        const response = await Order.findAll({
            include:[
                User,
                {
                model:OrderProduct,
                include:{
                    model:Product,
                    where:{
                        businessId:business.id
                    }
                }
                
            }]
        });
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
    
const deleteOrderProduct = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const orderProduct = await OrderProduct.findOne({
            where:{
                uuid
            }
        });
        const response = await orderProduct.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteOrder = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const order = await Order.findOne({
            where:{
                uuid
            }
        });
        const response = await order.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const updateOrderProduct = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const orderProduct = await OrderProduct.findOne({
            where:{
                uuid
            }
        });
        const response = await orderProduct.update({...req.body})
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

module.exports = {
    createOrder,deleteOrderProduct,deleteOrder,getCustomerOrders,getSpecificBusinessOrders,updateOrderProduct
}