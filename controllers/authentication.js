const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");
const config = require("../config");
const passportService = require("../setuppassport");
const passport = require("passport");

function generateToken(user) {
    return jwt.sign(user, config.JWT_SECRET, {
        expiresIn: "14d"
    });
}

function setUserInfo(user) {  
    return {
        email: user.email,
        username: user.username,
        id: user._id
    };
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {
    if(!req.user) return next();

    let userId = req.user.id;
    let userInfo;

    User.findById(userId, function(err, foundUser){
        if(err) { return next(err); }
        userInfo = setUserInfo(foundUser);
        res.status(200).json({
            token: "JWT " + generateToken({id: userId}),
            user: userInfo
        });
    });

    
};

//========================================
// Login without generating new JWT route
//========================================
exports.loginNoJWT = function(req, res, next) {
    if(!req.user) return next();
    let userId = req.user.id;

    let userInfo;


    User.findById(userId, function(err, foundUser){
        if(err) { return next(err); }
        userInfo = setUserInfo(foundUser);

        res.status(200).json({
            user: userInfo
        });
    });

    
};



//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {  
    // Check for registration errors
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: "You must enter an email address."});
    }

    // Return error if no username provided
    if (!username) {
        return res.status(422).send({ error: "You must enter your username."});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: "You must enter a password." });
    }

    User.findOne({$or:[{ email: email}, {username: username}] }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user is not unique, return errors
        if (existingUser && existingUser.email === email) {
            return res.status(422).send({ error: "Email address is already in use." });
        }


        if(existingUser && existingUser.username === username) {
            return res.status(422).send({ error: "Username is already in use." });
        }

        // If email and username is unique and password was provided, create account
        let user = new User({
            username: username,
            email: email,
            password: password
        });

        user.save(function(err, user) {
            if (err) { return next(err); }
            // Login user if user was created
            req.user = {
                id: user.id
            };
            exports.login(req,res,next);
        });
    });
};


//========================================
// JWT Authentication Middleware
//========================================

exports.JWTLogin = function(req,res,next){
    passport.authenticate("jwt", function(err,user,info){
        if(err || info) {
            if(!err)
                err = new Error(info);
            return next(err);
        }
        if(!user) { return res.status(401); }
        req.user = user;
        return next();
    })(req);
};

//========================================
// JWT Verification Middleware
//========================================

exports.JWTVerify = function(req,res,next){
    passport.authenticate("jwtVerify", function(err,userId,info){
        if(err || info) {
            if(!err)
                err = new Error(info);
            return next(err);
        }
        if(!userId) { return res.status(401); }
        req.user = {
            id : userId
        };
        return next();
    })(req);
};

//========================================
// LocalLogin Middleware
//========================================
exports.localLogin = function(req,res,next){
    passport.authenticate("local", function(err, user, message){
        if(err) { return next(err); }
        if(!user) { return res.status(422).send(message); }
        req.user = user;
        return next();
    })(req, res, next);
};