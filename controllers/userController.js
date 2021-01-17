const passport = require('passport');
const User = require('../model/User');
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bycrypt = require('bcrypt');

//user registration  system
const register = async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        //see if the user exists
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email })
            if (!user) {
                //get user gravater
                const avater = gravatar.url(email, {
                    s: "",
                    r: "",
                    d: ""
                });

                //encrypt password
                bycrypt.hash(password, 11, async(err, hashedPassword) => {
                    if (err) {
                        res.json(err)
                    }
                    let user = new User({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        avater: avater
                    })
                    await user.save();
                    const payload = {
                        user: {
                            id: user.id
                        }
                    }
                    jwt.sign(
                        payload,
                        "MYSECRETTOKEN", { expiresIn: 36000 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token })
                        }
                    )
                });


            } else {
                res.status(400).json({
                    error: "user already exists"
                })
            }

        } catch (e) {
            console.log(e);
            res.status(500).json({
                error: "server error"
            })
        }

    }
    //user registration system

//user login system
const login = async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        //see if the user exists
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email })
            if (!user) {
                res.status(400).json({
                    error: "User does not exist"
                })
            }

            //encrypt password
            isMatched = await bycrypt.compare(password, user.password);
            if (!isMatched) {
                return res.status(404).json({
                    error: "Your credentials are invalid"
                })
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                "MYSECRETTOKEN", { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            )

        } catch (e) {
            console.log(e);
            res.status(500).json({
                error: "server error"
            })
        }
    }
    //user login system

module.exports = {
    register,
    login
}