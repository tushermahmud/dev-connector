const jwt = require("jsonwebtoken");


const authCheck = (req, res, next)=> {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({
            error:"no token found"
        })
    }
    try{
        const decoded = jwt.verify(token, "MYSECRETTOKEN");
        req.user = decoded.user 
        next()

    }catch(e){
        res.status(401).json({
            error:"the token is not valid"
        })
    }
}

module.exports = authCheck