const router = require("express").Router();
const {register, login} = require("../controllers/userController")
const {check} = require("express-validator");


router.post('/register',[
    check('name', "Name is Required")
    .not()
    .isEmpty(),
    check('email',"Plase provide a valid email")
    .isEmail(),
    check('password',"password field is required")
    .isLength({min:6})
]
, register)
router.post('/login', [
    check('email',"Plase provide a valid email")
    .isEmail(),
    check('password',"password field is required").exists()
    ], login);

module.exports = router