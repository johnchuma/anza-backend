const { User,Business,Product,OrderProduct,Payment,Order, Sequelize } = require("../../models");

const { successResponse, errorResponse } = require("../../utils/responses");
const {Op} = require("sequelize");


  const getCounts = async(req,res)=>{
    const user = req.user
    try {
        const pending = await OrderProduct.count({
            include:{
                model:Product,
                include:{
                    model:Business,
                    where:{
                        userId:user.id
                    }
                }
            },
          where:{
            status: "pending"
          }
        })
        const complete = await OrderProduct.count({
            include:{
                model:Product,
                include:{
                    model:Business,
                    where:{
                        userId:user.id
                    }
                }
            },
          where:{
            status: "delivered"
          }
        })
        // PROFIT
        const business = await Business.findOne({
            where:{
                userId:1//user.id
            }
        })
        // res.send(business)
        const profit = await OrderProduct.findAll({
            include:{
                model:Product,
                where:{
                    businessId:business.id,
                }
            },
            // attributes:{
            //     include: [
            //         [
            //             Sequelize.literal(`(
            //                 SELECT AVG(rate)
            //                 FROM Product AS product
            //                 WHERE
            //                     id = OrderProduct.productId
            //             )`),
            //             'buyingPrice'
            //         ],
            //         [
            //             Sequelize.literal(`(
            //                 SELECT count(*)
            //                 FROM Product AS product
            //                 WHERE
            //                     id = OrderProduct.productId
            //             )`),
            //             'sellingPrice'
            //         ]
            //     ],
            // }
        })
        // END PROFIT
        const sales = await OrderProduct.count({
            include:{
                model:Product,
                include:{
                    model:Business,
                    where:{
                        userId:user.id
                    }
                }
            },
        })

        const products = await Product.count({
            include:{
                model:Business,
                where:{
                    userId:user.id,
                }
            }
        })
        const in_stock = await Product.count({
            include:{
                model:Business,
                where:{
                    userId:user.id,
                }
            },
            where:{
                amount:{[Op.gt]:0},
            }
        })
        const out_stock = await Product.count({
            include:{
                model:Business,
                where:{
                    userId:user.id,
                }
            },
            where:{
                amount:{[Op.lte]:0},
            }
        })

        successResponse(res,{pending:pending, complete:complete, profit: profit, sales: sales, products:products, in_stock:in_stock, out_stock:out_stock  })
    } catch (error) {
        errorResponse(res,error)
    }
  }

  module.exports = {
    getCounts,
  }