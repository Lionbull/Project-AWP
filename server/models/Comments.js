// Description: This file contains the schema for the comment model

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    commented_post_id: {type: String},
    email: {type: String},
    body: {type: String}
});

module.exports = mongoose.model("comments", commentSchema);