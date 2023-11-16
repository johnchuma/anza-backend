const { errorResponse, successResponse } = require("../../utils/responses")
const {User} = require("../../models");
const { sendEmail } = require("../../utils/send_email");

const broadcastPromotion = async(req,res)=>{
    try {
        const role = req.params.role;
        const user = await User.findAll({
            where:{role}
        })
    
        for (let index = 0; index < user.length; index++) {
            await sendEmail(req, res, user, '${role}_promotion')
        }
        successResponse(res,order)
    } catch (error) {
        errorResponse(res,error)
    }
}

module.exports = {broadcastPromotion}