const { User,Business,Product,OrderProduct,Payment,Order, Sequelize } = require("../../models");

const { successResponse, errorResponse } = require("../../utils/responses");
const {Op} = require("sequelize");


  const getCounts = async(req,res)=>{
    var totalBuyingPrice = 0,totalSellingPrice = 0
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
        for (let index = 0; index < profit.length; index++) {
            const element = profit[index];
            // res.send({data: element})
            // res.send({data: element.quantity})
            // res.send({data: element.Product.buyingPrice})

            totalBuyingPrice += element.Product.buyingPrice * element.quantity
            totalSellingPrice += element.Product.sellingPrice * element.quantity
            
        }
        const difference = totalSellingPrice - totalBuyingPrice
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

        successResponse(res,{pending:pending, complete:complete, profit: difference, sales: sales, products:products, in_stock:in_stock, out_stock:out_stock,
            totalBuyingPrice:totalBuyingPrice,totalSellingPrice:totalSellingPrice,  })
    } catch (error) {
        errorResponse(res,error)
    }
  }

  module.exports = {
    getCounts,
  }