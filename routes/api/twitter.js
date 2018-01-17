const express  = require("express");
const config   = require("../../config");
const passport = require("passport");
const request  = require("request");
const crypto   = require("crypto");
const qs       = require("qs");

//this is 1st step in getting authorization from user to access his profile
//https://dev.twitter.com/web/sign-in/implementing

//link to authorize application
//needs auth token appended to be completed
const TWITTER_AUTH_URL_INCOMPLETE =  "https://api.twitter.com/oauth/authenticate?oauth_token=";

exports.getTwitterAuthLink = function(req, res, next) {
    let oauth = {
        callback: config.TWITTER_CALLBACK,
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET
    }
    let url = "https://api.twitter.com/oauth/request_token";
    //obtain request token from twitter
    request({
        url: url,
        method: "POST",
        oauth: oauth
    }, function(err, response, body){
        let status = response.statusCode;
        //prase response body
        let parsedBody = qs.parse(body);
        if(err || status !== 200 || parsedBody.oauth_callback_confirmed !== "true"){
            return res.status(422).json({error: "Failed to send request to twitter, please try again later."})
        }

        req.responseObj.TWITTER_AUTH_URL = TWITTER_AUTH_URL_INCOMPLETE + parsedBody.oauth_token;
        return next();
    });
    
};

exports.getTwitterAccessToken = function(req, res, next) {
    let urlQuery = req.query;
    if(!!urlQuery.denied || !(urlQuery.oauth_token && urlQuery.oauth_verifier)) {
        return res.status(422).json({error: "Authorization denied"});
    }
    let oauth = {
        consumer_key: config.TWITTER_CONSUMER_KEYCONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        token: urlQuery.oauth_token,
        verifier: urlQuery.oauth_verifier
    }
    let url = "https://api.twitter.com/oauth/access_token";
    //obtain access token from twitter
    request({
        url: url,
        method: "POST",
        oauth: oauth
    }, function(err, response, body){
        let status = response.statusCode;
        //prase response body
        let parsedBody = qs.parse(body);
        if(err || status !== 200 || !(parsedBody.oauth_token && parsedBody.oauth_token_secret)){
            return res.status(422).json({error: "Failed to send request to twitter, please try again later."})
        }

        req.twitterResponse = parsedBody;
        return next();
    });
}
