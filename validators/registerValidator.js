const validator = require('validator');

const validate = user => {
    let error = {};
    if (!user.name){
        error.name = "please provide your name"
    }
    if (!user.email){
        error.email = "please provide your email" 
    }
    else if(!validator.isEmail(user.email)){
        error.email = "please provide a valid email"
    }

    if(!user.password){
        error.password = 'please provide the password'
    }
    else if(!user.password > 6){
        error.password = "The password length must be more than 6 characters"
    }

    if(!user.confirmPassword) {
        error.confirmPassword = "please provide confirm password"
    }
    else if(user.password !== user.confirmPassword){
        error.confirmPassword = "password does not match"
    }
    return {
        error,
        isValid: Object.keys(error).length === 0 
    }
}
module.exports = validate 
