const { User,Business,Product,OrderProduct,Payment,Order, Sequelize } = require("../../models");

const { successResponse, errorResponse } = require("../../utils/responses");
const {Op} = require("sequelize");


  const getCounts = async(req,res)=>{
    var totalBuyingPrice,totalSellingPrice
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
            status: "waiting"
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
                userId:user.id
            }
        })
        const profit = await OrderProduct.findAll({
            include:{
                model:Product,
                where:{
                    businessId:business.id,
                }
            },
            attributes:{
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT buyingPrice
                            FROM Products AS product
                            WHERE
                                id = OrderProduct.productId
                        )`),
                        'buyingPrice'
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT sellingPrice
                            FROM Products AS product
                            WHERE
                                id = OrderProduct.productId
                        )`),
                        'sellingPrice'
                    ]
                ],
            },
        })
        // res.send(profit[0].Product)
        profit.forEach(element => {
            totalBuyingPrice += element.buyingPrice * element.quantity
            totalSellingPrice += element.sellingPrice * element.quantity
        });
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

        successResponse(res,{pending:pending, complete:complete, profit: profit, sales: sales, products:products, in_stock:in_stock, out_stock:out_stock,
            totalBuyingPrice:totalBuyingPrice,totalSellingPrice:totalSellingPrice,  })
    } catch (error) {
        errorResponse(res,error)
    }
  }

  module.exports = {
    getCounts,
  }