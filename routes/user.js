const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const config = require('./../config/config');
const User = require('../models/user');
const passwordCheck = require('../services/passwordCheck');

//email validation
const eValidator = require('email-validator');

//------------------ user registration---------------------//
router.post('/register', (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    });

    if (eValidator.validate(newUser.email)) {
        User.addUser(newUser, (err, user) => {
            if (err) {
                res.json({
                    success: false,
                    errorMsg: 'Failed to register user'
                });
            } else if (user === null) {
                res.json({
                    success: false,
                    errorMsg: 'Email already registered'
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Registered Successfully'
                });
            }
        });
    } else {
        if (!eValidator.validate(newUser.email)) {
            res.json({
                success: false,
                errorMsg: 'Enter a valid email'
            });
        } else {
            res.json({
                success: false,
                errorMsg: 'Something went wrong'
            });
        }
    }
});

// ------------------ authentication of user ------------------//
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                errorMsg: 'User not found. Please sign-up first.'
            });
        } else if (user) {
            passwordCheck.comparePassword(
                password,
                user.password,
                user,
                (err, info) => {
                    if (err) throw err;
                    if (!info) {
                        res.json({
                            success: false,
                            errorMsg: 'Incorrect password'
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: 'You are now logged in ',
                            token: info,
                        });
                    }
                }
            );
        }
    });
});

module.exports = router;