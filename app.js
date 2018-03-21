const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const config = require("./config");
const morgan = require("morgan");
const routes = require("./routes");
const passportService = require("./setuppassport");

const mongooseOptions = { promiseLibrary: global.Promise };
mongoose.connect(config.DB, mongooseOptions);

if(process.env.NODE_ENV !== "test"){
    app.use(morgan("combined"));
}

app.set("port", process.env.PORT || 8080);

app.use(compression());

app.use(express.static("public"));

app.use(helmet.xssFilter());
app.use(helmet.frameguard("sameorigin"));
app.use(helmet.noSniff());

app.disable("x-powered-by");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({"generalMessage": "Error response from server, please try again later"});
});

let server = app.listen(app.get("port"), err => {
    if(err){
        console.log(err);
        return;
    } 
    console.log(`Server started on port ${app.get("port")}`);
});

module.exports = server;