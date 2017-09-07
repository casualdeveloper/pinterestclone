const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pinSchema = mongoose.Schema({
    url: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    creationDate: { type: Date, required: true, default: Date.now() }
});

const Pin = mongoose.model("Pin", pinSchema);
module.exports = Pin;