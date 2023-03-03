// Description: This file contains the schema for the post model

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    email: {type: String},
    title: {type: String},
    body: {type: String}
});

module.exports = mongoose.model("posts", postSchema);