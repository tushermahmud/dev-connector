const validator = require('validator');
const validate = user =>{
    let error = {}
    if (!user.email){
        error.email = "please provide your email" 
    }
    else if(!validator.isEmail(user.email)){
        error.email = "please provide a valid email"
    }
    if(!user.password){
        error.password = 'please provide the password'
    }
    return {
        error,
        isValid: Object.keys(error).length === 0 
    }
}
module.exports = validate