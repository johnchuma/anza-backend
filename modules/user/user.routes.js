const {Router} = require("express")
const { validateJWT } = require("../../utils/validateJWT")
const router = Router()
const upload = require("../../utils/upload");
const { registerUser,  loginUser,  deleteUser, updateUser,  getHash, pushSMS,  sendPasswordLink, passwordReset, sendMessage, getAllUsers, getUserDetails, 
    getAllSellers,getMyDetails } = require("./user.controller");

router.post("/register", registerUser)
router.post("/message",validateJWT,sendMessage)
router.post("/sms",validateJWT,pushSMS)
router.post("/reset-password",sendPasswordLink)
router.patch("/password/:uuid",passwordReset)
router.patch("/:uuid",upload.single('file'),validateJWT,updateUser)
router.delete("/:uuid",validateJWT,deleteUser)
router.post("/login",loginUser)
router.get("/sellers",validateJWT,getAllSellers)
// router.get("/hash",getHash)
router.get("/:uuid",validateJWT,getUserDetails)
router.get("/",validateJWT,getAllUsers)
router.get("/me",validateJWT,getMyDetails)

module.exports = router