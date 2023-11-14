const { errorResponse, successResponse } = require("../../utils/responses")
const {User,Wishlist,Product} = require("../../models");

const createWishlist = async(req,res)=>{
try {
    const {
        user_uuid
    } = req.body;
    const uuid = req.params.uuid;
    const user = await User.findOne({
      uuid: user_uuid
    })
    const product = await Product.findOne({
       uuid
    })
    const wishlist = await Wishlist.create({
        userId:user.id,
        productId:product.id
    })
    
    successResponse(res,wishlist)
} catch (error) {
    errorResponse(res,error)
}
}



    const deleteWishlist = async(req,res)=>{
        try {
            const uuid = req.params.uuid
            const Wishlist = await Wishlist.findOne({
                where:{
                    uuid
                }
            });
            const response = await Wishlist.destroy()
            successResponse(res,response)
        } catch (error) {
            errorResponse(res,error)
        }
    }


    const isInWishlist = async(req,res)=>{
        try {
            const uuid = req.params.uuid
            const {user_uuid} = req.body
            const user = await User.findOne({
                where:{
                    uuid: user_uuid
                }
            });
            const product = await Product.findOne({
                where:{
                    uuid
                }
            });
            const response = await Wishlist.findOne({
                where:{
                    productId: product.id,
                    userId: user.id,
                }
            })
            successResponse(res,response)
        } catch (error) {
            errorResponse(res,error)
        }
    }

    const myWishlist = async(req,res)=>{
        try {
            const uuid = req.params.uuid
            const user = await User.findOne({
                where:{
                    uuid
                }
            });
            const response = await Wishlist.findAll({
                where:{
                    userId: user.id,
                }
            })
            successResponse(res,response)
        } catch (error) {
            errorResponse(res,error)
        }
    }

module.exports = {
    createWishlist,deleteWishlist,isInWishlist,myWishlist
}