const {Router} = require("express")

const router = Router()
const upload = require("../../utils/upload");
const { registerUser,  loginUser,  deleteUser, updateUser,  getHash, pushSMS,  sendPasswordLink, passwordReset, sendMessage } = require("./user.controller");

router.post("/register", registerUser)
router.post("/message",sendMessage)
router.post("/sms",pushSMS)
router.post("/reset-password",sendPasswordLink)
router.patch("/password/:uuid",passwordReset)
router.patch("/:uuid",upload.single('file'),updateUser)
router.delete("/:uuid",deleteUser)
router.post("/login",loginUser)
router.get("/hash",getHash)

module.exports = router