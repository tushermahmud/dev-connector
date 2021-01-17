const User = require("../model/User")

const findUser = async(req,res) => {
    try{
        let user = await User.findById(req.user.id).select('-password');
        return res.json(user);
    }catch(e){
        return res.status(500).json({
            error: "server error"
        })
    }
}
module.exports = {
    findUser
}