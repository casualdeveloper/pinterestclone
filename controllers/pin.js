const Pin = require("../models/pin");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.new = (req, res, next) => {
    let data = {
        url: req.body.url,
        description: req.body.description,
        owner: req.user.id
    }

    Pin.create(data, (err, pin) => {
        if(err) return next(err);
        req.pin = pin;
        return next();
    });
}
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
}

exports.fetch = (req, res, next) => {
    const PINS_IN_PAGE = 24;
    const lastPinId = req.body.lastPinId;
    //if there is no lastpin sent that means we are on first page
    //thus we keep query find params empty
    //otherwise we set query params to
    //look only for pins whose id is greater
    //than the last pin's
    let queryFindParams = {};
    if(lastPinId){
        let oid = mongoose.Types.ObjectId(lastPinId);
        queryFindParams = {_id: {$lt: oid}};
    }

    Pin.find(queryFindParams).sort({ $natural: -1 }).limit(PINS_IN_PAGE).exec((err, results) => {
        if(err) return next(err);
        req.fetchedPins = results;
        return next();
    });
}