const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config");
const passport = require("passport");
const inputValidation = require("../utils/inputValidation");


function generateToken(user) {
    return jwt.sign(user, config.JWT_SECRET, {
        expiresIn: "14d"
    });
}

function setUserInfo(user) {  
    return {
        username: user.username || user.twitter.displayName,
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
        req.responseObj.JWT = "JWT " + generateToken({id: userId});
        req.responseObj.user = userInfo;
        return next();
    });
};

//========================================
// Login without generating new JWT
//========================================
exports.loginNoJWT = function(req, res, next) {
    if(!req.user) return next();

    let userId = req.user.id;
    let userInfo;

    User.findById(userId, function(err, foundUser){
        if(err) { return next(err); }
        userInfo = setUserInfo(foundUser);
        req.responseObj.user = userInfo;
        return next();
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

    // Return error if invalid email provided
    //note: its close to impossible to check if email address is valid with regex, preferably confirmation letter should be sent to email address
    if (!email || !inputValidation.isEmailValid(email)) {
        return res.status(422).send({ error: "Please provide valid email address."});
    }

    // Return error if invalid username provided
    if (!username || !inputValidation.isUsernameValid(username)) {
        return res.status(422).send({ error: "Please provide valid username."});
    }

    // Return error if invalid password provided
    if (!password || !inputValidation.isPasswordValid(password)) {
        return res.status(422).send({ error: "Please provide valid password." });
    }

    User.findOne({$or:[{ email: email}, {username: username}] }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user is not unique, return errors
        if (existingUser && existingUser.email === email) {
            return res.status(422).send({ error: "Email address or username is already in use." });
        }


        if(existingUser && existingUser.username === username) {
            return res.status(422).send({ error: "Email address or username is already in use." });
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
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !inputValidation.isUsernameValid(username)){
        return res.status(422).send({ error: "Please provide valid username."});
    }

    if(!password || !inputValidation.isPasswordValid(password)){
        return res.status(422).send({ error: "Please provide valid password" });
    }

    passport.authenticate("local", function(err, user, message){
        if(err) { return next(err); }
        if(!user) { return res.status(422).send(message); }
        req.user = user;
        return next();
    })(req, res, next);
};

//========================================
// TwitterLogin Middleware
//========================================
exports.twitterLogin = function(req, res, next){
    let twitterResponse = req.twitterResponse;;
    User.findOne({ "twitter.id" : twitterResponse.user_id }, function(err, user) {
        if(err) { return next(err); }
        if(user) {
            //update access token
            if(user.twitter.token !== twitterResponse.oauth_token){

                user.twitter.token = twitterResponse.oauth_token;
                user.twitter.tokenSecret = twitterResponse.oauth_token_secret;
                
                user.save((err) => {
                    if(err)
                        return next(err);

                    req.user = user;
                    return next();
                });
            }
            
            req.user = user;
            return next();
            
        }
        let newUser = new User({
            twitter: {
                displayName: twitterResponse.screen_name,
                id: twitterResponse.user_id,
                token: twitterResponse.oauth_token,
                tokenSecret: twitterResponse.oauth_token_secret,
                image: twitterResponse.image
            }
        });
        newUser.save(function(err, user){
            if(err) return next(err);
            req.user = user;
            return next();
        });
    });
};