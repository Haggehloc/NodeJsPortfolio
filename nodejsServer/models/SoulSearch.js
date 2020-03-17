const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SoulSearch = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  soulHandle: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Soul = mongoose.model("soulSearch", SoulSearch);
