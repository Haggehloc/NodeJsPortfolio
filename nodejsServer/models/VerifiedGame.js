const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VerifiedGame = new Schema({
  identificationNum: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = id = mongoose.model("VerifiedGame", VerifiedGame);