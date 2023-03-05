// Description: This file contains the schema for the vote model

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let voteSchema = new Schema ({
    vote: {type: Number},
    user_email: {type: String},
    post_id: {type: String}
});

module.exports = mongoose.model("votes", voteSchema);