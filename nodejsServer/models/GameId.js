const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GameId = new Schema({
  id: {
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

module.exports = id = mongoose.model("gameId", GameId);
