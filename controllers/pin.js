const Pin = require("../models/pin");
const User = require("../models/user");
const mongoose = require("mongoose");
const PINS_IN_PAGE_DEFAULT = require("../defaults").PINS_IN_PAGE_DEFAULT;
const request = require("request");

exports.validateInput = (req, res, next) => {
    const url = req.body.url;
    const description = req.body.description;

    // /\s/ matches whitespaces
    if(!url || url.replace(/\s/g,"") === ""){
        return res.status(422).send({ error: "Please provide valid url." });
    }

    if(!description || description.replace(/\s/g, "") === "") {
        return res.status(422).send({ error: "Please provide valid description." });
    }

    //check if url actually exists by sending head request and checking if statusCode is 2xx
    request({ url: url, method: "HEAD"}, function(err, urlRes){
        if(err || /2\d\d/.test(urlRes.statusCode) === false) 
            return res.status(422).send({ error: "Please provide valid url." });
        return next();
    });

};

exports.new = (req, res, next) => {
    let data = {
        url: req.body.url,
        description: req.body.description,
        owner: req.user.id
    };

    Pin.create(data, (err, pin) => {
        if(err) return next(err);
        req.pin = pin;
        return next();
    });
};
//should be called after deleting from users pin list
//when calling delete function from users controller
//it checks if user is owner of the pi nand only then proceeds
//so if request came to this middleware it means
//user is owner of the pin and we don't have to worry about it.
exports.delete = (req, res, next) => {
    let pinId = req.body.pinId;
    if(!pinId) return res.status(422).json({error:"Inavlid pin id!"});
    
    Pin.findByIdAndRemove(pinId, err => {
        if(err) return next(err);
        return next();
    });
};

exports.fetch = (req, res, next) => {
    const lastPinId = req.body.lastPinId;
    const requestedAmountOfPins = parseInt(req.body.amountOfPins, 10);
    const PINS_IN_PAGE = (requestedAmountOfPins && requestedAmountOfPins <= PINS_IN_PAGE_DEFAULT)
                         ?requestedAmountOfPins
                         :PINS_IN_PAGE_DEFAULT;
    //if there is no lastpin sent that means we are on first page
    //thus we keep query find params empty
    //otherwise we set query params to
    //look only for pins whose id is lesser (was created before)
    //than the last pin's
    let queryFindParams = {};
    if(lastPinId){
        let oid = mongoose.Types.ObjectId(lastPinId);
        queryFindParams = {_id: {$lt: oid}};
    }

    Pin.find(queryFindParams).sort({ $natural: -1 }).limit(PINS_IN_PAGE).populate("owner", "displayName").exec((err, results) => {
        if(err) return next(err);
        req.fetchedPins = results;
        return next();
    });
};

exports.fetchUserPins = (req, res, next) => {
    const lastPinId = req.body.lastPinId;
    const userId = req.body.userId;
    const requestedAmountOfPins = parseInt(req.body.amountOfPins, 10);
    const PINS_IN_PAGE = (requestedAmountOfPins && requestedAmountOfPins <= PINS_IN_PAGE_DEFAULT)
                         ?requestedAmountOfPins
                         :PINS_IN_PAGE_DEFAULT;
    //if no userId provided send error
    if(!userId) { return res.status(422).json({error: "Invalid user id!"}); }
    
    //see comment about pages in exports.fetch function

    let matchParams = {};
    if(lastPinId){
        let oid = mongoose.Types.ObjectId(lastPinId);
        matchParams = {_id: {$lt: oid}};
    }

    User.findById(userId).populate({
        path: "pins",
        match: matchParams,
        options: { 
            limit: PINS_IN_PAGE,
            sort: { $natural: -1 }
         }
    }).lean().exec((err, results) => {
        if(err) return next(err);
        req.fetchedPins = results.pins;
        return next();
    });
};