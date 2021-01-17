const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const {findUser} = require("../controllers/authController")


router.get("/",authMiddleware, findUser)

module.exports=router