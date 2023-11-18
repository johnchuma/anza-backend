const express = require('express')
const bodyParser = require("body-parser");
const UserRoutes =  require("./modules/user/user.routes")
const BusinessRoutes =  require("./modules/business/business.routes")
const CategoryRoutes =  require("./modules/category/category.routes")
const ProductRoutes =  require("./modules/product/product.routes")
const WishlistRoutes =  require("./modules/wishlist/wishlist.routes")
const OrderRoutes =  require("./modules/order/order.routes")
const ProductImageRoutes =  require("./modules/product_image/product_image.routes")
const BusinessSector =  require("./modules/sector/sector.routes")
const Review =  require("./modules/review/review.routes")
const Favourite =  require("./modules/favourite/favourite.routes")
const Promotion =  require("./modules/promotion/promotion.routes")


const cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static("files"));
app.use(bodyParser.text({ type: "/" }));
// app.use("/user",UserRoutes)
app.use("/business",BusinessRoutes)
app.use("/product-image",ProductImageRoutes)
app.use("/product",ProductRoutes)
app.use("/category",CategoryRoutes)
app.use("/order",OrderRoutes)
app.use("/wishlist",WishlistRoutes)
app.use("/sector",BusinessSector)
app.use("/review",Review)
app.use("/favourite",Favourite)
app.use("/promotion",Promotion)

app.get('/',(req,res)=>{
    res.send("Anza marketplace API's are okay!")
})
app.listen(5000,()=>{
  console.log("Server started at port 5000")
})