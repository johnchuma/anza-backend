const express = require('express')
const bodyParser = require("body-parser");
const UserRoutes =  require("./modules/user/user.routes")
const BusinessRoutes =  require("./modules/business/business.routes")
const CategoryRoutes =  require("./modules/category/category.routes")
const ProductRoutes =  require("./modules/product/product.routes")
const WishlistRoutes =  require("./modules/wishlist/wishlist.routes")
const OrderRoutes =  require("./modules/order/order.routes")
const ProductImageRoutes =  require("./modules/product_image/product_image.routes")
const BusinessSectors =  require("./modules/sector/sector.routes")
const Reviews =  require("./modules/review/review.routes")
const Favourites =  require("./modules/favourite/favourite.routes")
const Promotions =  require("./modules/promotion/promotion.routes")
const Payments =  require("./modules/payment/payment.routes")
const Admin =  require("./modules/admin/admin.routes")
const Seller =  require("./modules/seller/seller.routes")
const Subscription =  require("./modules/subscription/subscription.routes")


const cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static("files"));
app.use(bodyParser.text({ type: "/" }));
app.use("/user",UserRoutes)
app.use("/business",BusinessRoutes)
app.use("/product-image",ProductImageRoutes)
app.use("/product",ProductRoutes)
app.use("/category",CategoryRoutes)
app.use("/order",OrderRoutes)
app.use("/wishlist",WishlistRoutes)
app.use("/sector",BusinessSectors)
app.use("/review",Reviews)
app.use("/favourite",Favourites)
app.use("/promotion",Promotions)
app.use("/payment",Payments)
app.use("/admin",Admin)
app.use("/seller",Seller)
app.use("/subscription",Subscription)

app.get('/',(req,res)=>{
    res.send("Anza marketplace API's are okay!")
})
app.listen(5000,()=>{
  console.log("Server started at port 5000")
})